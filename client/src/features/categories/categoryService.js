import axios from "axios";
import { baseURL, config } from "../../utils/axiosConfig";

const getAllCategories = async () => {
  const response = await axios.get(`${baseURL}/product-categories`, config);
  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(
    `${baseURL}/product-categories/${id}`,
    config
  );
  return response.data;
};

const categoryService = { getAllCategories, getCategory };

export default categoryService;
