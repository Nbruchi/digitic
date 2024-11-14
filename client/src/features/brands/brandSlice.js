import { toast } from "react-toastify";
import brandService from "./brandService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllBrands = createAsyncThunk(
  "brands/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getAllBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBrand = createAsyncThunk(
  "brands/get-brand",
  async (brandId, thunkAPI) => {
    try {
      return await brandService.getBrand(brandId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  brands: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singlebrand = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
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

export default brandSlice.reducer;
