import { toast } from "react-toastify";
import userService from "./userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const localStorageCustomer = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const registerUser = createAsyncThunk(
  "user/create-user",
  async (data, thunkAPI) => {
    try {
      return await userService.registerUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login-user",
  async (data, thunkAPI) => {
    try {
      return await userService.loginUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await userService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCart = createAsyncThunk(
  "user/create-cart",
  async (cartData, thunkAPI) => {
    try {
      return await userService.createCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk("user/get-cart", async (thunkAPI) => {
  try {
    return await userService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeCartProduct = createAsyncThunk(
  "user/remove-cart-product",
  async (id, thunkAPI) => {
    try {
      return await userService.removeCartProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCartProductQuantity = createAsyncThunk(
  "user/update-cart-product-quantity",
  async (cartDetails, thunkAPI) => {
    try {
      return await userService.updateCartProductQuantity(cartDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update-user",
  async (userDetails, thunkAPI) => {
    try {
      return await userService.updateUser(userDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "user/create-order",
  async (orderDetails, thunkAPI) => {
    try {
      return await userService.createOrder(orderDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/get-orders",
  async (thunkAPI) => {
    try {
      return await userService.getMyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPasswordToken = createAsyncThunk(
  "user/forgot-password",
  async (data, thunkAPI) => {
    try {
      return await userService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (data, thunkAPI) => {
    try {
      return await userService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emptyCart = createAsyncThunk(
  "user/empty-cart",
  async (thunkAPI) => {
    try {
      return await userService.emptyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user: localStorageCustomer,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.success(`User created successfully!`);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          toast.success("User logged in successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCart = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Added to cart`);
        }
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(removeCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.removedProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Product removed from cart!`);
        }
      })
      .addCase(removeCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(updateCartProductQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProductQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateCartProductQuantity.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if (state.isSuccess === true) {
          let currentUserData = JSON.parse(localStorage.getItem("customer"));
          let newData = {
            _id: currentUserData?._id,
            token: currentUserData?.token,
            firstname: action.payload?.firstname,
            lastname: action.payload?.lastname,
            email: action.payload?.email,
            mobile: action.payload?.mobile,
          };
          localStorage.setItem("customer", JSON.stringify(newData));
          state.user = newData;
          toast.success(`User updated successfully!`);
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Ordered successfully!`);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Forgot password email sent!`);
        }
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.password = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Password reset!`);
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Cart emptied!`);
        }
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      });
  },
});

export default userSlice.reducer;
