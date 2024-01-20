import axios from "axios";

export const getProduct = async () => {
  try {
    const response = await axios.get(
      "http://ec2-43-201-5-79.ap-northeast-2.compute.amazonaws.com/product/getCategoryProduct"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(
      "http://ec2-43-201-5-79.ap-northeast-2.compute.amazonaws.com/product/addProduct",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = async (productId, requestBody) => {
  try {
    const response = await axios.put(
      `http://ec2-43-201-5-79.ap-northeast-2.compute.amazonaws.com/product/editProduct/${productId}`,
      requestBody
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `http://ec2-43-201-5-79.ap-northeast-2.compute.amazonaws.com/product/${productId}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
