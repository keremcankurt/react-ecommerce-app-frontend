import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";
import { logout, logoutUser } from "../auth/authSlice";
import { removeSeller } from "../seller/sellerSlice";
const initialState = {
    user: null,
    followingStores: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    cart: []
  };

export const upload = createAsyncThunk('user/upload', async (profile_image, thunkAPI) => {
    try {
      const response = await userService.upload(profile_image);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      const user = JSON.parse(localStorage.getItem('user'));
      user.profilePicture = result.data;
      localStorage.setItem('user', JSON.stringify(user));
      return result.data;
    } catch (e) {
        toast.error(e.message)
        if(e.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
      return thunkAPI.rejectWithValue(e.message);
    }
  });
  export const getUser = createAsyncThunk('user/getUser', async (data=null,thunkAPI) => {
    try {
      const response = await userService.getUser();
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
        toast.error(error.message);
        if(error.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const edit = createAsyncThunk('user/edit', async (data,thunkAPI) => {
    try {
      const response = await userService.edit(JSON.stringify(data));
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
     
      toast.success(result.message);
      
      return result;
    } catch (error) {
        toast.error(error.message);
        if(error.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.message);
    }
  });

  export const getAllFollowingSellers = createAsyncThunk('user/getallfollowingsellers', async (data=null,thunkAPI) => {
    try {
      const response = await userService.getAllFollowingSellers();
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result.data;
    } catch (error) {
        toast.error(error.message);
        if(error.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.message);
    }
  });

  export const resetPassword = createAsyncThunk('user/changepassword', async (data,thunkAPI) => {
    try {
      const response = await userService.changePassword(JSON.stringify(data));
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return result;
    } catch (error) {
        toast.error(error.message);
        if(error.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const deleteAccount = createAsyncThunk('user/delete', async (data=null,thunkAPI) => {
    try {
      const response = await userService.deleteAccount();
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return result;
    } catch (error) {
        toast.error(error.message);
        if(error.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const beSeller = createAsyncThunk('user/beseller', async (data,thunkAPI) => {
    try {
      const response = await userService.beSeller(JSON.stringify(data));
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return result;
    } catch (error) {
        toast.error(error.message);
        if(error.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const favProduct = createAsyncThunk('user/fav', async (id,thunkAPI) => {
    try {
      const response = await userService.favProduct(id);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
        toast.error(error.message);
        if(error.message === "You are not authorized to access this route"){
          thunkAPI.dispatch(logoutUser());
        }
        return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const getCart = createAsyncThunk('user/cart', async (cart,thunkAPI) => {
    try {
      const response = await userService.getCart(JSON.stringify(cart));
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
      }
  });
  export const addOrder = createAsyncThunk('user/addorder', async (orders,thunkAPI) => {
    try {
      const response = await userService.addOrder(JSON.stringify(orders));
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
      }
  });
  export const addComment = createAsyncThunk('user/addcomment', async (data,thunkAPI) => {
    try {
      const response = await userService.addComment(data);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return result;
    } catch (error) {
      toast.error(error.message);
      if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
      }
      return thunkAPI.rejectWithValue(error.message);
      }
  });
  export const follow = createAsyncThunk('user/follow', async (id,thunkAPI) => {
    try {
      const response = await userService.follow(id);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return id;
    } catch (error) {
      toast.error(error.message);
      if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
      }
      return thunkAPI.rejectWithValue(error.message);
      }
  });
  export const unfollow = createAsyncThunk('user/unfollow', async (id,thunkAPI) => {
    try {
      const response = await userService.unfollow(id);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      return id;
    } catch (error) {
      toast.error(error.message);
      if(error.message === "You are not authorized to access this route"){
        thunkAPI.dispatch(logoutUser());
      }
      return thunkAPI.rejectWithValue(error.message);
      }
  });
  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      },
      addCart: (state,action) => {
        state.cart.push(action.payload);
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({[action.payload._id]: action.payload.quantity })
        localStorage.setItem("cart", JSON.stringify(cart));
      },
      decreaseQuantityOrder: (state, action) => {
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      
        const updatedCartIds = updatedCart.map((item) => ({
          [item._id]: item.quantity
        }));
      
        localStorage.setItem('cart', JSON.stringify(updatedCartIds));
      
        state.cart = updatedCart;
      },
      increaseQuantityOrder: (state, action) => {
        const updatedCart = state.cart.map((item) =>
          item._id === action.payload && item.quantity < ((item.stock > 5) ? 5 : item.stock)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      
        const updatedCartIds = updatedCart.map((item) => ({
          [item._id]: item.quantity
        }));
      
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(updatedCartIds));
      
        state.cart = updatedCart;
      },
      deleteOrder: (state,action) => {
        const updatedCart = state.cart.filter((item) => item._id !== action.payload);
        state.cart = updatedCart;
        const cart = state.cart.map(item => ({
          [item._id]: item.quantity
        }));
        localStorage.removeItem(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        
      },
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(upload.fulfilled, (state,action) => {
          state.user.profilePicture = action.payload
          state.isError = false;
        })
        .addCase(upload.rejected, (state) => {
          state.isError = true
        })
        .addCase(getUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getUser.rejected, (state) => {
          state.isLoading = false
          state.user = null
          state.isError = false
          state.isSuccess = false
          state.message = ""
        })
        .addCase(getUser.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
          state.user = action.payload.user
        })
        .addCase(edit.fulfilled, (state,action) => {
          state.user = action.payload.data
        })
        .addCase(getAllFollowingSellers.fulfilled, (state,action) => {
          state.followingStores = action.payload
        })
        .addCase(logout.fulfilled, (state,action) => {
          state.isLoading = false
          state.isSuccess = false
          state.isError = false
          state.message = ""
          state.user = null
          state.followingStores = null
        })
        .addCase(resetPassword.pending, (state) => {
          state.isLoading = true
        })
        .addCase(resetPassword.fulfilled, (state) => {
          state.isLoading = false
        })
        .addCase(resetPassword.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(deleteAccount.fulfilled, (state) => {
          state.user= null
          state.followingStores= null
          state.isError= false
          state.isSuccess= false
        }) 
        .addCase(beSeller.pending, (state) => {
          state.isLoading = true
        })
        .addCase(beSeller.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(beSeller.fulfilled, (state,action) => {
          state.isLoading = false
        })
        .addCase(removeSeller.fulfilled, (state,action) => {
          state.user = action.payload.data
        })
        .addCase(favProduct.fulfilled, (state,action) => {
          state.user = action.payload.data
        })
        .addCase(getCart.fulfilled, (state,action) => {
          state.cart = action.payload
          const cart = action.payload.map(item => ({
            [item._id]: item.quantity
          }));
          localStorage.removeItem(cart)
          localStorage.setItem('cart', JSON.stringify(cart))
        })
        .addCase(addOrder.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addOrder.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(addOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          localStorage.removeItem("cart");
          state.cart = [];
          state.user.orders = action.payload.orders;
        })
        
        
        .addCase(addComment.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addComment.rejected, (state,action) => {
          state.isLoading = false
          const id = action.payload.id;
          const orderIndex = state.user.orders.findIndex(order => order._id === id);
          if (orderIndex !== -1) {
            state.user.orders[orderIndex].comment = "Ürün kaldırılmış";
          }
        })
        .addCase(addComment.fulfilled, (state,action) => {
          const updatedOrder = action.payload.data;
          const orderIndex = state.user.orders.findIndex(order => order._id === updatedOrder._id);
          if (orderIndex !== -1) {
            state.user.orders[orderIndex] = updatedOrder;
          }
          state.isLoading = false;
        })
        .addCase(follow.fulfilled, (state, action) => {
          const sellerId = action.payload;
          state.user.followings.push(sellerId);
        })
        .addCase(unfollow.fulfilled, (state, action) => {
          const sellerId = action.payload;
          const index = state.user.followings.indexOf(sellerId);
          if (index !== -1) {
            state.user.followings.splice(index, 1);
          }
        })
        
          
    }

});

export const { reset, addCart, decreaseQuantityOrder, deleteOrder, increaseQuantityOrder } = userSlice.actions;
export default userSlice.reducer;