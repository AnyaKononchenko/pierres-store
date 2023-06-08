// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { CartItem, ProductWithCategory } from '@customTypes/products';

const cart: CartItem[] =
  localStorage.getItem("cart") !== null
    ?
    JSON.parse(String(localStorage.getItem("cart")))
    : [];


const initialState: { cart: CartItem[], products: ProductWithCategory[] } = { cart, products: [] };

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (slugs: { slugs: string | undefined }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products/slugs`, slugs)
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
      if (!state.cart.find((product) => product.name === action.payload)) {
        state.cart = [...state.cart, { name: action.payload, amount: 1 }]
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product.name !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    changeProductAmount: (state, action) => {
      const { name, amount } = action.payload
      state.cart.find((product) => product.name === name).amount = amount
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

export const { addToCart, removeFromCart, changeProductAmount, clearCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.cart; // array of slugs
export const selectProducts = (state: RootState) => state.cart.products; // actual products from api

export default cartSlice.reducer;
