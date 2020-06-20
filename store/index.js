import API from '@/utils/api'
import { firstDayOfMount, formatDate, sortDates } from '@/utils/date'

export const setLocations = 'SET_LOCATIONS'
export const setSectors = 'SET_SECTORS'
export const setPartners = 'SET_PARTNERS'
export const setAds = 'SET_ADS'
export const setWorks = 'SET_WORKS'

export const handleDatePicker = 'HANDLE_DATE_PICKER'
export const handleSelect = 'HANDLE_SELECT'
export const toggleModal = 'TOGGLE_MODAL'
export const handleLoading = 'HANDLE_LOADING'
export const handleError = 'HANDLE_ERROR'
export const handleForm = 'HANDLE_FORM'

export const state = () => ({
  locations: ['mersin', 'istanbul'],
  raw_locations: [
    { id: 1, name: 'mersin' },
    { id: 2, name: 'istanbul' }
  ],
  raw_sectors: [
    { id: 1, name: 'klima' },
    { id: 2, name: 'elektrik' }
  ],
  raw_partners: [
    {
      id: 1,
      name: 'ahmet',
      location: 'mersin',
      sectors: ['klima', 'elektrik'],
      phone: '05555555555'
    },
    {
      id: 2,
      name: 'mehmet',
      location: 'mersin',
      sectors: ['klima', 'elektrik'],
      phone: '05555555555'
    }
  ],
  partners: ['ahmet', 'mehmet'],
  sectors: ['klima', 'elektrik'],
  works: [],
  ads: [],
  selected_dates: [
    firstDayOfMount()
      .toISOString()
      .substr(0, 10),
    new Date().toISOString().substr(0, 10)
  ],
  selected_location: '',
  selected_partner: '',
  selected_sector: '',
  toggle_modal: false,
  title_modal: 'asdasd',
  name_modal: 'locations',
  loading_datatable: false,
  error_message: null,
  location_form: {
    name: ''
  },
  sector_form: {
    name: ''
  },
  partner_form: {
    name: '',
    phone: '',
    location: '',
    sectors: []
  },
  ad_form: {
    date: new Date().toISOString().substr(0, 10),
    amount: ''
  },
  add_work_form: {
    partner: '',
    location: '',
    sector: '',
    customer_phone: '',
    amount: '',
    date: new Date().toISOString().substr(0, 10)
  }
})

export const getters = {
  date_range_text: (state) => {
    const newDates = []
    return sortDates(newDates.concat(state.selected_dates))
      .map((date) => formatDate(date))
      .join(' ~ ')
  }
}

export const mutations = {
  [setLocations]: (state, payload) => {
    state.locations = payload
  },
  [setSectors]: (state, payload) => {
    state.sectors = payload
  },
  [setPartners]: (state, payload) => {
    state.partners = payload
  },
  [setWorks]: (state, payload) => {
    state.works = payload
  },
  [handleDatePicker]: (state, payload) => {
    state.selected_dates = sortDates(payload)
  },
  [handleSelect]: (state, payload) => {
    state['selected_' + payload.name] = payload.value
  },
  [toggleModal]: (state, payload) => {
    const { value, name, title } = payload
    state.name_modal = name
    state.title_modal = title
    state.toggle_modal = value
  },
  [handleLoading]: (state, payload) => {
    state['loading_' + payload.name] = payload.value
  },
  [handleError]: (state, payload) => {
    state.error_message = payload
  },
  [handleForm]: (state, payload) => {
    const { value, name, key } = payload

    state[name + '_form'] = { ...state[name + '_form'], [key]: value }
  }
}

export const actions = {
  async handleSelect({ dispatch, commit }, payload) {
    commit(handleSelect, payload)
    await dispatch('getWorks')
  },
  async getLocations({ commit }) {
    const partners = await API.get('/locations', {})
    commit(setPartners, partners)
  },
  async getSectors({ commit }) {
    const partners = await API.get('/sectors')
    commit(setPartners, partners)
  },
  async getPartners({ commit }) {
    const partners = await API.get('/partners')
    commit(setPartners, partners)
  },
  async getAds({ commit }) {
    const ads = await API.get('/ads')
    commit(setAds, ads)
  },
  async getWorks({ state, getters, commit }) {
    commit(handleLoading, { name: 'datatable', value: true })
    const location = state.raw_locations.find(
      (item) => item.name === state.selected_location
    )
    const sector = state.raw_sectors.find(
      (item) => item.name === state.selected_sector
    )
    const partner = state.raw_partners.find(
      (item) => item.name === state.selected_partner
    )
    try {
      const works = await API.get('/posts', {
        params: {
          location_id: location && location.id,
          sector_id: sector && sector.id,
          partner_id: partner && partner.id,
          start: state.selected_dates[0],
          end: state.selected_dates[1]
        }
      })
      commit(setWorks, works)
    } catch (error) {
      commit(handleError, error.message)
    }
    commit(handleLoading, { name: 'datatable', value: false })
  },
  toggleModal({ dispatch, commit }, payload) {
    const { name } = payload
    commit(toggleModal, payload)
    if (name === 'locations') dispatch('getLocations')
    if (name === 'sectors') dispatch('getSectors')
    if (name === 'partners') {
      dispatch('getSectors')
      dispatch('getLocations')
      dispatch('getPartners')
    }
    if (name === 'ads') dispatch('getAds')
    if (name === 'add_work') {
      dispatch('getSectors')
      dispatch('getLocations')
      dispatch('getPartners')
    }
  }
}
