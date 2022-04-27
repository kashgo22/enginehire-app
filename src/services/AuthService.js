import DataService from "./common/DataService";
import Transformer from "../transformers"

function errorResponse(e) {
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
  async login(loginInfo) {
    try {
      const { data } = await DataService.post("v1/api-token-auth/", loginInfo);
      return Transformer.mapLoginData(data);
    } catch (e) {
      return errorResponse(e);
    }
  },
  async getUser(userId) {
    try {
      const { data } = await DataService.get(`api/people/${userId}`);
      return Transformer.mapUserData(data);
    } catch (e) {
      return errorResponse(e);
    }
  },
  async getAgency(agencyId) {
    try {
      const { data } = await DataService.get(`api/agencies/${agencyId}`);
      return Transformer.mapAgencyData(data);
    } catch (e) {
      return errorResponse(e);
    }
  },
};
// 
