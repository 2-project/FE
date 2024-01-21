import http from "./instance";

export const getGoodsDetails = (params) =>
  http.get("/api/product/productDetail", params);

export const addGoodsToCart = (data) =>
  http.postJSON("/api/product", {
    data,
  });
