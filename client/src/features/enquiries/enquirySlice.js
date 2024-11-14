import { toast } from "react-toastify";
import enquiryService from "./enquiryService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createEnquiry = createAsyncThunk(
  "enquiries/create-enquiry",
  async (data, thunkAPI) => {
    try {
      return await enquiryService.createEnquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllEnquiries = createAsyncThunk(
  "enquiries/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getAllEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  enquiries: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Contact form submitted!`);
        }
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.error(`Something went wrong`);
        }
      })
      .addCase(getAllEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.error(`Something went wrong`);
        }
      });
  },
});

export default enquirySlice.reducer;
