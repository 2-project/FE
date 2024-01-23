import http from "./instance";

export const getAllProduct = () => http.get("/api/admin/product/getAllProduct");

export const addProduct = (data) =>
  http.postJSON("/api/admin/product/addProduct", data);

export const editOption = (requestBody) =>
  http.put("/api/admin/product/editOption", requestBody);

export const deleteProduct = (requestBody) =>
  http.delete("/api/admin/product/deleteProduct", requestBody);
