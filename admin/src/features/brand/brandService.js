import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { baseURL } from "../../utils/baseURL";
const getBrands = async () => {
  const response = await axios.get(`${baseURL}/brands/`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${baseURL}/brands/`, brand, config);

  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${baseURL}/brands/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${baseURL}/brands/${id}`, config);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${baseURL}/brands/${id}`, config);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
