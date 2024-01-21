import http from "./instance";

export const addSignUp = (signupData) =>
  http.postJSON("/auth/login", {
    data: signupData,
  });
