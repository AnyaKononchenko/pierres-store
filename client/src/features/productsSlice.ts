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

const initialState: { products: ProductType[], product: ProductType, pending: boolean, message: string, error: CommonResponse } = { products: [], product: null, pending: false, message: "", error: emptyError }

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

export const createProduct = createAsyncThunk(
  'products/addProduct',
  async ({ product, token }: { product: FormData, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products`, product, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ slug, token }: { slug: string | undefined, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/products?name=${slug}`, config)
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
    setMessage: (state, action) => {
      state.message = action.payload
    }
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
    // create product
    builder.addCase(createProduct.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.message = action.payload.message
      state.pending = false;
      state.error = '';
    })
    builder.addCase(createProduct.rejected, (state, action) => {
      console.log("Error in case", action.payload)
      state.message = ""
      state.pending = false;
      state.error = action.payload
    })
    // delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.message = action.payload.message
      state.pending = false;
      state.error = '';
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
      console.log("Error in delete", action.payload)
      state.message = ""
      state.pending = false;
      state.error = action.payload
    })
  },
})

export const { setMessage } = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products;
export const selectError = (state: RootState) => state.products.error;
export const selectPending = (state: RootState) => state.products.pending;
export const selectMessage = (state: RootState) => state.products.message;

export default productsSlice.reducer;
