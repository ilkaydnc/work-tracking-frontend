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

export const state = () => ({
  locations: ['mersin', 'istanbul'],
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
  toggle_modal: false,
  title_modal: 'asdasd',
  name_modal: 'locations',
  loading_datatable: false,
  error_message: null,
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
  async getWorks({ state, getters, commit }) {
    commit(handleLoading, { name: 'datatable', value: true })
    try {
      })
      commit(setWorks, works)
    } catch (error) {
      commit(handleError, error.message)
    }
    commit(handleLoading, { name: 'datatable', value: false })
  },
  toggleModal({ dispatch, commit }, payload) {
    commit(toggleModal, payload)
  }
}
