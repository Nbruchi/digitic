import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { baseURL } from "../../utils/baseURL";

const getCoupons = async () => {
  const response = await axios.get(`${baseURL}/coupons/`, config);

  return response.data;
};

const createCoupons = async (coupon) => {
  const response = await axios.post(`${baseURL}/coupons/`, coupon, config);

  return response.data;
};

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${baseURL}/coupons/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );

  return response.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(`${baseURL}/coupons/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${baseURL}/coupons/${id}`, config);

  return response.data;
};

const couponService = {
  getCoupons,
  createCoupons,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;
