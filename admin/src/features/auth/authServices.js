import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { baseURL } from "../../utils/baseURL";

const login = async (user) => {
  const response = await axios.post(`${baseURL}/users/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${baseURL}/users/orders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${baseURL}/users/orders/${id}`, config);

  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(`${baseURL}/users/monthly-orders`, config);

  return response.data;
};

const getAnnualOrders = async () => {
  const response = await axios.get(`${baseURL}/users/annual-orders`, config);

  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(`${baseURL}/users/all-orders`, config);

  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${baseURL}/users/orders/${data.id}`,
    { status: data.status },
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getAnnualOrders,
  getAllOrders,
  updateOrder,
};

export default authService;
