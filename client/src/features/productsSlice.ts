// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FilterQuery, PaginationInfo, ProductType } from '@customTypes/products';



const initialState: { products: ProductType[], product: ProductType, info: PaginationInfo, pending: boolean, response: CommonResponse } = { products: [], product: null, info: {}, pending: false, response: {} }

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (slug: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${slug}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (query: FilterQuery, { rejectWithValue }) => {
    try {
      const categoryQuery = query.category.map((category) => {
        return `category=${category}`
      }).join('&')
      const priceQuery = `price[gte]=${query.price.minPrice}&price[lte]=${query.price.maxPrice}`
      const searchQuery = `search=${query.search}`
      const paginationQuery = `page=${query.page}&limit=${query.limit}`
      const sortQuery = `sort=${query.sort}`

      const filterQuery = `${categoryQuery}&${priceQuery}&${searchQuery}&${paginationQuery}&${sortQuery}`
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?${filterQuery}`)
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
    // get product
    builder.addCase(getProduct.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload.payload;
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(getProduct.rejected, (state, action) => {
      state.pending = false;
      state.product = {};
      state.response = action.payload;
    })
    // get products
    builder.addCase(getProducts.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.payload.products;
      state.info = action.payload.payload.info;
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.pending = false;
      state.info = {};
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


export const selectProduct = (state: RootState) => state.products.product;
export const selectProducts = (state: RootState) => state.products.products;
export const selectInfo = (state: RootState) => state.products.info;
export const selectResponse = (state: RootState) => state.products.response;
export const selectPending = (state: RootState) => state.products.pending;

export default productsSlice.reducer;
