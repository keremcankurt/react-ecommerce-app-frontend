import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import sellerService from "./sellerService";
import { logoutUser } from "../auth/authSlice";


const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  products: []
};
export const addProduct = createAsyncThunk('seller/add', async (data, thunkAPI) => {
  try {
    const response = await sellerService.addProduct(data);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    toast.success(result.message);
    return result;
  } catch (error) {
    if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
    }
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const getProducts = createAsyncThunk('seller/getproducts', async (data=null, thunkAPI) => {
  try {
    const response = await sellerService.getProducts();
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
    }
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const editProduct = createAsyncThunk('seller/editproducts', async ({formData,id}, thunkAPI) => {
  try {
    const response = await sellerService.editProduct(formData,id);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
    }
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const addCampaign = createAsyncThunk('seller/addCampaign', async (data, thunkAPI) => {
  try {
    const response = await sellerService.addCampaign(data);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    toast.success(result.message);
    return result;
  } catch (error) {
    if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
    }
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteProduct = createAsyncThunk('seller/delete', async (id, thunkAPI) => {
  try {
    const response = await sellerService.deleteProduct(id);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    toast.success(result.message);
    return id;
  } catch (error) {
    if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
    }
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const removeSeller = createAsyncThunk('seller/removeseller', async (data=null, thunkAPI) => {
  try {
    const response = await sellerService.removeSeller();
    console.log(response)
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    toast.success(result.message);
    return result;
  } catch (error) {
    if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
    }
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

  export const sellerSlice = createSlice({
    name: "seller",
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
        .addCase(addProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addProduct.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.products.unshift(action.payload.data);
        })        
        .addCase(getProducts.fulfilled, (state,action) => {
          state.isLoading = false
          state.products = action.payload.data
        })
        .addCase(editProduct.fulfilled, (state, action) => {
          const updatedProduct = action.payload.data;
          const productId = updatedProduct._id;
          
          const index = state.products.findIndex(product => product._id === productId);
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        })
        .addCase(addCampaign.fulfilled, (state, action) => {
          const newProducts = state.products.map(product => {
            const matchingProduct = action.payload.data.find(
              newProduct => newProduct._id === product._id
            );
            if (matchingProduct) {
              return matchingProduct;
            } else {
              return product;
            }
          });
          state.products = newProducts; 
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          const productId = action.payload;
          state.products = state.products.filter(product => product._id !== productId);
        })
        .addCase(removeSeller.pending, (state) => {
          state.isLoading = true
        })
        .addCase(removeSeller.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(removeSeller.fulfilled, (state, action) => {
          state.isLoading = false;
          state.products = [];
        }) 
        
    }
});

export const { reset } = sellerSlice.actions;
export default sellerSlice.reducer;