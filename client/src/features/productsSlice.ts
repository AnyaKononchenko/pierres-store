// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductType } from '@customTypes/products';


const initialState: { products: ProductType[], product: ProductType, pending: boolean, response: CommonResponse } = { products: [], product: null, pending: false, response: {} }

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`)
      return response.data
    } catch (error) {
      console.log("error", error)
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

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ slug, product, token }: { slug: string | undefined, product: FormData, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/products?name=${slug}`, product, config)
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
  },
  extraReducers: (builder) => {
    // get products
    builder.addCase(getProducts.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.payload;
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
    // create product
    builder.addCase(createProduct.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(createProduct.rejected, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
    // edit product
    builder.addCase(editProduct.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(editProduct.rejected, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
    // delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
  },
})


export const selectProducts = (state: RootState) => state.products.products;
export const selectResponse = (state: RootState) => state.products.response;
export const selectPending = (state: RootState) => state.products.pending;

export default productsSlice.reducer;
