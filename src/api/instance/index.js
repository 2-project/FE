import qs from "qs";
import request from "./axios";

class Http {
  static instance = null;
  static getInstance() {
    if (Http.instance) {
      return Http.instance;
    }
    Http.instance = new Http();
    return Http.instance;
  }

  async createRequest(config) {
    const response = await request(config);
    return response.data;
  }

  get(url, params, headers, responseType) {
    return this.createRequest({
      method: "GET",
      url,
      params: {
        ...params,
      },
      headers,
      responseType: responseType,
    });
  }

  post(url, data, headers) {
    return this.createRequest({
      method: "POST",
      url,
      data: qs.stringify({ ...data }),
      headers,
    });
  }

  postJSON(url, data) {
    return this.createRequest({
      method: "POST",
      url,
      data:
        Object.prototype.toString.call(data) === "[object Object]"
          ? { ...data }
          : data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  delete(url, data, headers) {
    return this.createRequest({
      method: "DELETE",
      url,
      data,
      headers,
    });
  }
  put(url, data) {
    return this.createRequest({
      method: "PUT",
      url,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  upload(url, formData) {
    return this.createRequest({
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default Http.getInstance();
