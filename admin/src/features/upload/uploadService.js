import axios from "axios";
import { fileConfig } from "../../utils/axiosConfig";
import { baseURL } from "../../utils/baseURL";

const uploadImg = async (data) => {
  const response = await axios.post(`${baseURL}/uploads/`, data, fileConfig);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(`${baseURL}/uploads/${id}`, fileConfig);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
