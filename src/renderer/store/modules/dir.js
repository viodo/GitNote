const state = {
  list: []
}

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list
  }
}

const actions = {
  setDirList({commit}, state) {
    console.log(state,'lllllllll')
    commit('SET_LIST', state)
  },
}

export default {
  state,
  mutations,
  actions
}
