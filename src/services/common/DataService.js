import axios from "axios";
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("eh-token");
  if (token) {
    request.headers["Authorization"] = `Token ${token}`;
  }
  return request;
});

instance.interceptors.response.use(
  (response) => {
    if (localStorage.getItem("eh-token") !== null && response.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401 &&
      localStorage.getItem("eh-token") !== null
    ) {
      localStorage.clear();
      window.location.reload();
    }
    throw { ...error.response.data };
  }
);

export default instance;
