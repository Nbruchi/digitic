import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${baseURL}/blog-categories/`);

  return response.data;
};
const createBlogCategory = async (bcat) => {
  const response = await axios.post(
    `${baseURL}/blog-categories/`,
    bcat,
    config
  );

  return response.data;
};
const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${baseURL}/blog-categories/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );

  return response.data;
};
const getBlogCategory = async (id) => {
  const response = await axios.get(`${baseURL}/blog-categories/${id}`, config);

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${baseURL}/blog-categories/${id}`,
    config
  );

  return response.data;
};
const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  updateBlogCategory,
};

export default bCategoryService;
