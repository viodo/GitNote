const state = {
  list: [],
  cloneState:""
}

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list
  },
  SET_CLONESTATE: (state, text) => {
    state.cloneState = text
  }
}

const actions = {
  setDirList ({commit}, state) {
    console.log(state, 'lllllllll')
    commit('SET_LIST', state)
  },
  cloneState ({commit}, state) {
    console.log(state, 'lllllllll')
    commit('SET_CLONESTATE', state)
  }
}

export default {
  state,
  mutations,
  actions
}
