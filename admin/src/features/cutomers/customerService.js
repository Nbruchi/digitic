import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const getUsers = async () => {
  const response = await axios.get(`${baseURL}/users/all-users`);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
