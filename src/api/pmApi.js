import http from "./instance";

export const getProduct = (params) =>
  http.get("/api/product/getCategoryProduct", params);

export const addProduct = (data) =>
  http.postJSON("/api/product/addProduct", data);

export const editProduct = (requestBody) =>
  http.put("/api/product/editProduct", requestBody);

export const deleteProduct = (requestBody) =>
  http.delete("/api/product/deleteProduct", requestBody);
