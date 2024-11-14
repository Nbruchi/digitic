import axios from "axios";
import { baseURL, config } from "../../utils/axiosConfig";

const getAllProducts = async (data) => {
  const response = await axios.get(
    `${baseURL}/products?${data?.brand ? `brand=${data?.brand}&&` : ""}${
      data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${
      data?.sort ? `sort=${data?.sort}&&` : ""
    }`
  );
  return response.data;
};

const addToWishlist = async (productId) => {
  const response = await axios.put(
    `${baseURL}/products/wishlist`,
    { productId },
    config
  );
  return response.data;
};

const getProduct = async (productId) => {
  const response = await axios.get(`${baseURL}/products/${productId}`, {
    productId,
  });
  return response.data;
};

const addRating = async (data) => {
  const response = await axios.put(`${baseURL}/products/rating`, data, config);
  return response.data;
};

const productService = {
  getAllProducts,
  addToWishlist,
  getProduct,
  addRating,
};

export default productService;
