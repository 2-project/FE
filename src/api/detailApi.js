import http from "./instance";

export const getGoodsDetails = (productId) =>
  http.get(`/api/product/productDetail/${productId}`);

export const addGoodsToCart = (productId, data) =>
  http.postJSON(`/api/cart/${productId}`, data);
