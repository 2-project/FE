import axios from "axios";
import { localToken } from "../../utils/auth";

const base_url = "";

const instance = axios.create({
  baseURL: base_url,
  timeout: 6000,
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      return;
    }
    config.headers["time-zone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    const token = localToken.get();

    let auth = "";

    if (token) {
      auth = "Bearer " + token;
    } else {
      auth = "Basic " + btoa("webApp:webApp");
    }

    // TODO: 为什么要加这个
    // if (!config.headers.NotToken) {
    //   auth = "";
    // }

    if (auth) {
      config.headers.Authorization = auth;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
