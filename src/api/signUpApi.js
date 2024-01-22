import http from "./instance";

export const addSignUp = (signupData) =>
  http.postJSON("/auth/signup", {
    data: signupData,
  });
