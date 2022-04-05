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
  agency: {
    data: null,
    errors: [],
  },
});

// getters
const getters = {
  userData: (state) => state.user.data,
  userErrors: (state) => state.user.errors,
  userId: () => localStorage.getItem("eh-userId"),
  agencyData: (state) => state.agency.data,
  agencyErrors: (state) => state.agency.errors,
  authErrors: (state) => state.auth.errors,
  isAuthenticated: () => localStorage.getItem("eh-token") ? true : false,
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
    } else {
      commit("setAuthError", errors);
    }
  },
  async getCurrentAgency({ commit }, agencyId) {
    commit("setAgencyStart");
    const { success, data, errors } = await AuthService.getAgency(agencyId);
    if (success) {
      commit("setAgencyData", data); 
    } else {
      commit("setAgencyError", errors);
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
  setAgencyStart(state) {
    state.agency.errors = [];
  },
  setAgencyData(state, data) {
    state.agency.data = data;
  },
  setAgencyError(state, errors) {
    state.agency.errors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
