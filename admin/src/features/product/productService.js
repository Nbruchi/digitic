import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { baseURL } from "../../utils/baseURL";

const getProducts = async () => {
  const response = await axios.get(`${baseURL}/products`);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${baseURL}/products/${id}`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${baseURL}/products`, product, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${baseURL}/products/${product.id}`,
    product,
    config
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${baseURL}/products/${id}`, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};

export default productService;
