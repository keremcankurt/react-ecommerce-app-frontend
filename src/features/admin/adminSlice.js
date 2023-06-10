import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { toast } from "react-toastify";
import { logoutUser } from "../auth/authSlice";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const rejectSeller = createAsyncThunk('admin/rejectseller', async (id, thunkAPI) => {
    try {
      const response = await adminService.rejectSeller(id);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return result.message;
    } catch (error) {
      toast.error(error.message);
      if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  });
export const confirmSeller = createAsyncThunk('admin/confirmseller', async (data, thunkAPI) => {
    try {
      const response = await adminService.confirmSeller(data);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return result.message;
    } catch (error) {
      toast.error(error.message);
      if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  });

  export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(rejectSeller.pending, (state) => {
          state.isLoading = true
        })
        .addCase(rejectSeller.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(rejectSeller.fulfilled, (state) => {
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(confirmSeller.pending, (state) => {
          state.isLoading = true
        })
        .addCase(confirmSeller.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(confirmSeller.fulfilled, (state) => {
          state.isLoading = false
          state.isSuccess = true
        })
    }

});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;