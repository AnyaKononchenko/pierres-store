// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductType } from '@customTypes/products';

const emptyError: CommonResponse = {
  status: "",
  statusCode: 0,
  message: "",
}

const initialState: { products: ProductType[], pending: boolean, error: CommonResponse } = { products: [], pending: false, error: emptyError }

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // get products
    builder.addCase(getProducts.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.payload;
      state.pending = false;
      state.error = '';
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload
    })
  },
})


export const selectProducts = (state: RootState) => state.products.products;
export const selectError = (state: RootState) => state.products.error;
export const selectPending = (state: RootState) => state.products.pending;

export default productsSlice.reducer;
