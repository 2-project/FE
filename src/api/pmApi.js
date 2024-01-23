import http from "./instance";

export const getProduct = (params) => http.get("/api/product", params);

export const addProduct = (data) =>
  http.postJSON("/api/product/addProduct", data);

export const editOption = (requestBody) =>
  http.put("/api/product/editOption", requestBody);

export const deleteProduct = (requestBody) =>
  http.delete("/api/product/deleteProduct", requestBody);
