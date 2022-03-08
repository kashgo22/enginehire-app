import DataService from "./common/DataService";
import Transformers from "../transformers";

// function successResponse(data) {
//   return { success: true, errors: null, data };
// }

function errorResponse(e) {
  const errors = [];
  if (e.errors) {
    //will update according to BE error response
    Object.entries(e.errors).forEach((val) => errors.push(val));
  } else {
    errors.push("Something went wrong!");
  }
  return { success: false, errors, data: null };
}

export default {
  async getUser() {
    try {
      const { data } = await DataService.get("user");
      return Transformers.mapUser(data);
    } catch (e) {
      return errorResponse(e);
    }
  },
};
