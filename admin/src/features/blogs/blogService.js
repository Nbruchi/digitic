import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${baseURL}/blogs/`);

  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${baseURL}/blogs/`, blog, config);

  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${baseURL}/blogs/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );

  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseURL}/blogs/${id}`, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseURL}/blogs/${id}`, config);

  return response.data;
};
const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
