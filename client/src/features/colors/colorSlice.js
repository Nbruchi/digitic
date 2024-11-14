import { toast } from "react-toastify";
import colorService from "./colorService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllColors = createAsyncThunk(
  "colors/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getAllColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getColor = createAsyncThunk(
  "colors/get-color",
  async (colorId, thunkAPI) => {
    try {
      return await colorService.getColor(colorId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  colors: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singlecolor = action.payload;
      })
      .addCase(getColor.rejected, (state, action) => {
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

export default colorSlice.reducer;
