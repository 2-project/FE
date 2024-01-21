import http from "./instance";

export const getGoodsDetails = (params) =>
  http.get("/product/productDetail", params);

export const addGoodsToCart = (data) =>
  http.postJSON("/product", {
    data,
  });
