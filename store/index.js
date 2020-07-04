import { firstDayOfMount, formatDate, sortDates } from '@/utils/date'
import graphqlClient from '~/graphql'
import { GET_DATA } from '~/graphql/queries'

export const setLocations = 'SET_LOCATIONS'
export const setSectors = 'SET_SECTORS'
export const setPartners = 'SET_PARTNERS'
export const setAds = 'SET_ADS'
export const setWorks = 'SET_WORKS'
export const setRawData = 'SET_RAW_DATA'
export const selectWork = 'SELECT_WORK'

export const handleDatePicker = 'HANDLE_DATE_PICKER'
export const handleSelect = 'HANDLE_SELECT'
export const toggleModal = 'TOGGLE_MODAL'
export const handleLoading = 'HANDLE_LOADING'
export const handleError = 'HANDLE_ERROR'

export const state = () => ({
  partners: [],
  locations: [],
  sectors: [],
  works: [],
  ads: [],
  filter_dates: [
    firstDayOfMount()
      .toISOString()
      .substr(0, 10),
    new Date().toISOString().substr(0, 10)
  ],
  filter_location: undefined,
  filter_partner: undefined,
  filter_sector: undefined,
  selected_work: undefined,
  toggle_modal: false,
  title_modal: 'asdasd',
  name_modal: 'locations',
  loading_datatable: false,
  loading_modal: false,
  error_message: null
})

export const getters = {
  date_range_text: (state) => {
    const newDates = []
    return sortDates(newDates.concat(state.filter_dates))
      .map((date) => formatDate(date))
      .join(' ~ ')
  }
}

export const mutations = {
  [setRawData]: (state, payload) => {
    state[payload.name] = payload.value
  },
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
    state.filter_dates = sortDates(payload)
  },
  [handleSelect]: (state, payload) => {
    state['filter_' + payload.name] = payload.value
  },
  [selectWork]: (state, payload) => {
    state.selected_work = payload
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
  }
}

export const actions = {
  async handleSelect({ dispatch, commit }, payload) {
    commit(handleSelect, payload)
    await dispatch('getData')
  },
  async getPartners({ commit }) {
    const partners = await API.get('/partners')
    commit(setPartners, partners)
  },
  async getAds({ commit }) {
    const ads = await API.get('/ads')
    commit(setAds, ads)
  },
  async getData({ state, commit }) {
    commit(handleLoading, { name: 'datatable', value: true })
    commit(setWorks, [])
    commit(setPartners, [])
    commit(setLocations, [])
    commit(setSectors, [])

    try {
      const {
        data: { works, partners, locations, sectors }
      } = await graphqlClient.query({
        query: GET_DATA,
        variables: {
          filterWorksInput: {
            partnerId: state.filter_partner,
            locationId: state.filter_location,
            sectorId: state.filter_sector,
            startDate: state.filter_dates[0],
            endDate: state.filter_dates[1] || state.filter_dates[0]
          }
        },
        fetchPolicy: 'network-only'
      })
      commit(
        setWorks,
        works.map((item, index) => ({ ...item, index: index + 1 }))
      )
      commit(setPartners, partners)
      commit(setLocations, locations)
      commit(setSectors, sectors)
    } catch (error) {
      commit(handleError, error.message)
    }
    commit(handleLoading, { name: 'datatable', value: false })
  },
  toggleModal({ dispatch, commit }, payload) {
    commit(toggleModal, payload)
  }
}
