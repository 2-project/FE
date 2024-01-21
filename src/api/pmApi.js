import axios from "axios";

const base_url =
  "http://ec2-43-201-5-79.ap-northeast-2.compute.amazonaws.com:8080";

export const getProduct = async () => {
  try {
    const response = await axios.get(
      `${base_url}/api/produc/getCategoryProduct`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(
      `${base_url}/api/product/addProduct`,
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

export const editProduct = async (requestBody) => {
  try {
    const response = await axios.put(
      `${base_url}/api/product/editProduct`,
      requestBody
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${base_url}/api/product/deleteProduct`,
      { data: { productId } }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
