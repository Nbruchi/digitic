import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { config } from "../../utils/axiosConfig";

const getColors = async () => {
  const response = await axios.get(`${baseURL}/colors/`);

  return response.data;
};
const createColor = async (color) => {
  const response = await axios.post(`${baseURL}/colors/`, color, config);

  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${baseURL}/colors/${color.id}`,
    { title: color.colorData.title },
    config
  );

  return response.data;
};
const getColor = async (id) => {
  const response = await axios.get(`${baseURL}/colors/${id}`, config);

  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${baseURL}/colors/${id}`, config);

  return response.data;
};
const colorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default colorService;
