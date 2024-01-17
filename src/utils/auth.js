const TOKEN_KEY = "auth_token";

export const localToken = {
  set(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  get() {
    return localStorage.getItem(TOKEN_KEY);
  },
  remove() {
    localStorage.setItem(TOKEN_KEY, "");
  },
};
