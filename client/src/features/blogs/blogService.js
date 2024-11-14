import axios from "axios";
import { baseURL } from "../../utils/axiosConfig";

const getAllBlogs = async () => {
  const response = await axios.get(`${baseURL}/blogs`);
  return response.data;
};

const getBlog = async (blogId) => {
  const response = await axios.get(`${baseURL}/blogs/${blogId}`);
  return response.data;
};

const blogService = { getAllBlogs, getBlog };

export default blogService;
