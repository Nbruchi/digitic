import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { baseURL } from "../../utils/baseURL";
const getEnquiries = async () => {
  const response = await axios.get(`${baseURL}/enquiries/`);

  return response.data;
};
const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${baseURL}/enquiries/${id}`, config);
  return response.data;
};
const getEnquiry = async (id) => {
  const response = await axios.get(`${baseURL}/enquiries/${id}`);
  return response.data;
};
const udpateEnquiry = async (enq) => {
  const response = await axios.put(
    `${baseURL}/enquiries/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};
const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  udpateEnquiry,
};

export default enquiryService;
