const state = {
  user: {}
}

const mutations = {
  SET_USER: (state, user) => {
    console.log(user)
    state.user = user
  }
}

const actions = {
  getUser ({commit}, state) {
    commit('SET_USER', state)
  }
}

export default {
  state,
  mutations,
  actions
}
