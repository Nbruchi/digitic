import axios from "axios";
import { baseURL, config } from "../../utils/axiosConfig";

const getAllBrands = async () => {
  const response = await axios.get(`${baseURL}/brands`, config);
  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${baseURL}/brands/${id}`, config);
  return response.data;
};

const brandService = { getAllBrands, getBrand };

export default brandService;
