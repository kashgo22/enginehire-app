import AuthService from "../../services/AuthService";

// initial state
const state = () => ({
  user: {
    data: null,
    errors: [],
  },
});

// getters
const getters = {
  userData: (state) => state.user.data,
  userErrors: (state) => state.user.errors,
};

// actions
const actions = {
  async getCurrentUser({ commit }) {
    commit("setUserStart");
    const { success, data, errors } = await AuthService.getUser();
    if (success) {
      commit("setUserData", data);
    } else {
      commit("setUserError", errors);
    }
  },
};

// mutations
const mutations = {
  setUserStart(state) {
    state.user.errors = [];
  },
  setUserData(state, data) {
    state.user.data = data;
  },
  setUserError(state, errors) {
    state.user.errors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
