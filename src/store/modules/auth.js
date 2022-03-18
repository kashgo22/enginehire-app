import AuthService from "../../services/AuthService";
// initial state
const state = () => ({
  auth: {
    errors: [],
  },
  user: {
    data: null,
    errors: [],
  },
});

// getters
const getters = {
  userData: (state) => state.user.data,
  userErrors: (state) => state.user.errors,
  authErrors: (state) => state.auth.errors,
  isAuthenticated: () => localStorage.getItem("eh-token"),
  userId: () => localStorage.getItem("eh-userId"),
};

// actions
const actions = {
  async login({ commit }, loginInfo) {
    commit("setAuthStart");
    const { success, data, errors } = await AuthService.login(loginInfo);
    if (success) {
      localStorage.setItem("eh-token", data.token);
      localStorage.setItem("eh-userId", data.userId);
      localStorage.setItem("eh-agencyId", data.agencyId);
      commit("setUserData", data); 
    } else {
      commit("setAuthError", errors);
    }
  },
  async getCurrentUser({ commit }, userId) {
    commit("setAuthStart");
    const { success, data, errors } = await AuthService.getUser(userId);
    if (success) {
      commit("setUserData", data); 
      console.log("Auth Action Get Curent User Data ===>", data);
    } else {
      commit("setAuthError", errors);
    }
  },
};

// mutations
const mutations = {
  setAuthStart(state) {
    state.auth.errors = [];
  },
  setAuthError(state, errors) {
    state.auth.errors = errors;
  },
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
