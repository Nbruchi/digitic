import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import blogReducer from "../features/blogs/blogSlice";
import brandReducer from "../features/brands/brandSlice";
import colorReducer from "../features/colors/colorSlice";
import productReducer from "../features/products/productSlice";
import enquiryReducer from "../features/enquiries/enquirySlice";
import categoryReducer from "../features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    brand: brandReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
