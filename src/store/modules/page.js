// initial state
const state = () => ({
  loading: false,
});

// getters
const getters = {
  isLoading: (state) => state.loading,
};

// actions
const actions = {
  startLoader({ commit }) {
    commit("setStartLoader");
  },
  stopLoader({ commit }) {
      commit("setStopLoader");
    
  },
};

// mutations
const mutations = {
    setStartLoader(state) {
        state.loading = true;
    },
    setStopLoader(state) {
        state.loading = false;
    },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
