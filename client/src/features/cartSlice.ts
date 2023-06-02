// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProductWithCategory } from '@customTypes/products';

const cart: string[] =
  localStorage.getItem("cart") !== null
    ?
    JSON.parse(String(localStorage.getItem("cart")))
    : [];


const initialState: { cart: string[], products: ProductWithCategory[] } = { cart, products: [] };

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (slugs: { slugs: string | undefined }, { rejectWithValue }) => {
    try {
      console.log(slugs)
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/slugs`, slugs)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload)
      state.cart = [...state.cart, action.payload]
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart: (state) => {
      state.cart = []
      localStorage.removeItem('cart')
    },
  },
  extraReducers: (builder) => {
    // get products for the cart
    builder.addCase(getCart.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.products = action.payload.payload;
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(getCart.rejected, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.cart;
export const selectProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
