import JobService from "../../services/JobService";
// initial state
const state = () => ({
  jobs: {
    data: [], 
    errors: [],
  },
});

// getters
const getters = {
  jobsData: (state) => state.jobs.data, //jobsData
  jobsErrors: (state) => state.jobs.errors,
};

// actions
const actions = {
  async getJobsList({ commit }, jobInfo) {
    commit("setJobsStart");
    const { success, data, errors } = await JobService.getJobs(jobInfo);
    if (success) {
      commit("setJobsData", data);
    } else {
      commit("setJobsError", errors);
    }
  },
  async updateJob({ commit }, {jobId, jobInfo}) {
    commit("setJobsStart");
    const { success, data, errors } = await JobService.updateJob(jobId, jobInfo);
    if (success) {
      console.log('Job Update Action ===> Commit ===> ',  data)
      commit("setJobsData", data);
    } else {
      commit("setJobsError", errors);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
