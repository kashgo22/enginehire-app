import { createStore } from "vuex";
import auth from "./modules/auth";
import job from "./modules/job";
import page from "./modules/page";

export default createStore({
  modules: {
    auth,
    job,
    page
  },
});
