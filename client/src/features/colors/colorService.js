import axios from "axios";
import { baseURL, config } from "../../utils/axiosConfig";

const getAllColors = async () => {
  const response = await axios.get(`${baseURL}/colors`, config);
  return response.data;
};

const getColor = async (id) => {
  const response = await axios.get(`${baseURL}/colors/${id}`, config);
  return response.data;
};

const colorService = { getAllColors, getColor };

export default colorService;
