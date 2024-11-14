import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${baseURL}/product-categories/`);

  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(
    `${baseURL}/product-categories/`,
    category,
    config
  );

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(
    `${baseURL}/product-categories/${id}`,
    config
  );

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(
    `${baseURL}/product-categories/${id}`,
    config
  );

  return response.data;
};
const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${baseURL}/product-categories/${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};
const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;
