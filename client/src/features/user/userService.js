import axios from "axios";
import { baseURL, config } from "../../utils/axiosConfig";

const registerUser = async (userData) => {
  const response = await axios.post(`${baseURL}/users/register`, userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${baseURL}/users/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const getUserWishlist = async () => {
  const response = await axios.get(`${baseURL}/users/wishlist`, config);
  return response.data;
};

const createCart = async (cartData) => {
  const response = await axios.post(`${baseURL}/users/cart`, cartData, config);
  return response.data;
};

const getCart = async () => {
  const response = await axios.get(`${baseURL}/users/cart`, config);
  return response.data;
};

const removeCartProduct = async (cartId) => {
  const response = await axios.delete(
    `${baseURL}/users/cart/${cartId}`,
    config
  );
  return response.data;
};

const updateCartProductQuantity = async (cartDetails) => {
  const response = await axios.put(
    `${baseURL}/users/cart/${cartDetails.cartId}/${cartDetails.quantity}`,
    cartDetails,
    config
  );
  return response.data;
};

const updateUser = async (userDetails) => {
  const response = await axios.put(
    `${baseURL}/users/edit-user`,
    userDetails,
    config
  );
  return response.data;
};

const createOrder = async (orderDetails) => {
  const response = await axios.post(
    `${baseURL}/users/orders`,
    orderDetails,
    config
  );
  return response.data;
};

const getMyOrders = async () => {
  const response = await axios.get(`${baseURL}/users/orders`, config);
  return response.data;
};

const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${baseURL}/users/forgot-password-token`,
    data
  );
  return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.put(
    `${baseURL}/users/reset-password/${data.token}`,
    { password: data?.password }
  );
  return response.data;
};

const emptyCart = async () => {
  const response = await axios.delete(`${baseURL}/users/empty-cart`, config);
  return response.data;
};

const userService = {
  getCart,
  emptyCart,
  loginUser,
  updateUser,
  createCart,
  createOrder,
  getMyOrders,
  registerUser,
  resetPassword,
  getUserWishlist,
  removeCartProduct,
  forgotPasswordToken,
  updateCartProductQuantity,
};

export default userService;
