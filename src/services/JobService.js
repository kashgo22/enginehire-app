import DataService from "./common/DataService";
import Transformer from "../transformers"

function errorResponse(e) { // move to transformer
  let errors = [];
  if (e.non_field_errors) {
    errors = e.non_field_errors
  }
  else if (e.message) {
    errors.push(e.message);
  } else {
    errors.push("Something went wrong!");
  }
  return { success: false, errors, data: null };
}

export default {
  async getJobs({agencyId, userId}) {
    try {
      const { data } = await DataService.get(`api/jobs/?agency=${agencyId}&filler=${userId}`);
      return Transformer.mapJobs(data);
    } catch (e) {
      return errorResponse(e);
    }
  },
  async updateJob({jobId, body}) {
    try {
      const { data } = await DataService.patch(`api/jobs/${jobId}`, body);
      return Transformer.success(data);
    } catch (e) {
      return errorResponse(e);
    }
  },
  async postReview(body) {
    try {
      const { data } = await DataService.post('api/reviews/', body);
      return Transformer.success(data);
    } catch (e) {
      return errorResponse(e);
    }
  },
};
