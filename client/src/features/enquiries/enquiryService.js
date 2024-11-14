import axios from "axios";
import { baseURL, config } from "../../utils/axiosConfig";

const createEnquiry = async (data) => {
  const response = await axios.post(`${baseURL}/enquiries`, data, config);
  return response.data;
};

const getAllEnquiries = async () => {
  const response = await axios.get(`${baseURL}/enquiries`);
  return response.data;
};

const enquiryService = { createEnquiry, getAllEnquiries };

export default enquiryService;
