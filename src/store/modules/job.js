import JobService from "../../services/JobService";
// initial state
const state = () => ({
  jobs: {
    data: [], 
    errors: [],
  },
  jobReviews: {
    errors: [],
  },
});

// getters
const getters = {
  jobsData: (state) => state.jobs.data,
  jobsErrors: (state) => state.jobs.errors,
  jobReviewsErrors: (state) => state.jobReviews.errors,
};

// actions
const actions = {
  async getJobsList({ commit }, userInfo) {
    commit("setJobsStart");
    const { success, data, errors } = await JobService.getJobs(userInfo);
    if (success) {
      commit("setJobsData", data);
    } else {
      commit("setJobsError", errors);
    }
  },
  async updateJob({ commit }, jobInfo) {
    commit("setJobsStart");
    const { success, errors } = await JobService.updateJob(jobInfo);
    if (success) {
      return
    } else {
      commit("setJobsError", errors);
    }
  },
  async addReview({ commit }, reviewInfo) {
    commit("setJobReviewsStart");
    const { success, errors } = await JobService.postReview(reviewInfo);
    if (success) {
      return
    } else {
      commit("setJobReviewsError", errors);
    }
  },
};

// mutations
const mutations = {
  setJobsStart(state) {
    state.jobs.errors = [];
  },
  setJobsData(state, data) {
    state.jobs.data = data;
  },
  setJobsError(state, errors) {
    state.jobs.errors = errors;
  },
  setJobReviewsStart(state) {
    state.jobReviews.errors = [];
  },
  setJobReviewsError(state, errors) {
    state.jobReviews.errors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
