import { firstDayOfMount, formatDate, sortDates } from '@/utils/date'
import graphqlClient from '~/graphql'
import { GET_DATA, SIGN_IN } from '~/graphql/queries'

export const setAppLoading = 'SET_APP_LOADING'
export const setAuth = 'SET_AUTHENTICATED'
export const setUser = 'SET_USER'
export const setLocations = 'SET_LOCATIONS'
export const setSectors = 'SET_SECTORS'
export const setPartners = 'SET_PARTNERS'
export const setAds = 'SET_ADS'
export const setWorks = 'SET_WORKS'
export const setStatistics = 'SET_STATISTICS'
export const setFilteredStatistics = 'SET_FILTERED_STATISTICS'

export const selectWork = 'SELECT_WORK'
export const handleDatePicker = 'HANDLE_DATE_PICKER'
export const handleSelect = 'HANDLE_SELECT'
export const toggleModal = 'TOGGLE_MODAL'
export const handleLoading = 'HANDLE_LOADING'
export const handleError = 'HANDLE_ERROR'

export const state = () => ({
  loading: true,
  authenticated: false,
  user: {
    token: localStorage.getItem('token')
  },
  partners: [],
  locations: [],
  sectors: [],
  works: [],
  ads: [],
  statistics: {},
  filteredStatistics: {},
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
  [setAppLoading]: (state, payload) => {
    state.loading = payload
  },
  [setAuth]: (state, payload) => {
    state.authenticated = payload
  },
  [setUser]: (state, payload) => {
    state.user = payload
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
  [setAds]: (state, payload) => {
    state.ads = payload
  },
  [setFilteredStatistics]: (state, payload) => {
    state.filteredStatistics = payload
  },
  [setStatistics]: (state, payload) => {
    state.statistics = payload
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
  async getData({ state, commit }) {
    commit(handleLoading, { name: 'datatable', value: true })
    try {
      const {
        data: {
          works,
          partners,
          locations,
          sectors,
          ads,
          statistics,
          statisticsWithFilter
        }
      } = await graphqlClient.query({
        query: GET_DATA,
        variables: {
          filterWorksInput: {
            partnerId: state.filter_partner,
            locationId: state.filter_location,
            sectorId: state.filter_sector,
            startDate: state.filter_dates[0],
            endDate: state.filter_dates[1] || state.filter_dates[0]
          },
          filterStatistics: {
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
      commit(setAds, ads)
      commit(setStatistics, statistics)
      commit(setFilteredStatistics, statisticsWithFilter)
      commit(handleError, undefined)
    } catch (error) {
      commit(handleError, error.message)
    }
    commit(setAppLoading, false)
    commit(handleLoading, { name: 'datatable', value: false })
  },
  toggleModal({ commit }, payload) {
    commit(toggleModal, payload)
  },
  async signIn({ dispatch, commit, redirect }, payload) {
    const { email, password } = payload

    try {
      const { data } = await graphqlClient.mutate({
        mutation: SIGN_IN,
        variables: {
          signInInput: {
            email,
            password
          }
        }
      })

      const { signIn } = data

      localStorage.setItem('token', signIn.token)
      commit(setUser, signIn)
      commit(setAuth, true)
      commit(handleError, undefined)
      this.$router.push('/')
    } catch (error) {
      commit(handleError, error.message)
    }
  },
  logout({ commit }) {
    localStorage.setItem('token', undefined)
    commit(setUser, {})
    commit(setAuth, false)
    this.$router.push('/login')
  }
}
