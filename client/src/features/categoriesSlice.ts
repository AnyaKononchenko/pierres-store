// @ts-nocheck
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../redux/store';
import { CategoryDocument } from '@customTypes/categories';

const emptyError: CommonResponse = {
  status: "",
  statusCode: 0,
  message: "",
}

const initialState: { categories: CategoryDocument[], message: string, pending: boolean, error: CommonResponse } = { categories: [], message: '', pending: false, error: emptyError }


export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const createCategory = createAsyncThunk(
  'categories/addCategory',
  async ({ category, token }: { category: CategoryDocument, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/categories`, category, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const updateCategory = createAsyncThunk(
  'categories/editCategory',
  async ({ slug, category, token }: { slug: string | undefined, category: CategoryDocument, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/categories?name=${slug}`, category, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async ({ slug, token }: { slug: string | undefined, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/categories?name=${slug}`, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    }
  },
  extraReducers: (builder) => {
    // get categories
    builder.addCase(getCategories.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.payload;
      state.pending = false;
      state.error = '';
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload
    })
    // create category
    builder.addCase(createCategory.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.message = action.payload.message
      state.pending = false;
      state.error = '';
    })
    builder.addCase(createCategory.rejected, (state, action) => {
      state.pending = false;
      state.message = ""
      state.error = action.payload
    })
    // update category
    builder.addCase(updateCategory.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.message = action.payload.message
      state.pending = false;
      state.error = '';
    })
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.pending = false;
      state.message = ""
      state.error = action.payload
    })
    // delete category
    builder.addCase(deleteCategory.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.message = action.payload.message
      state.pending = false;
      state.error = '';
    })
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.pending = false;
      state.message = ""
      state.error = action.payload
    })
  },
})

export const { setMessage } = categoriesSlice.actions

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectMessage = (state: RootState) => state.categories.message;
export const selectError = (state: RootState) => state.categories.error;
export const selectPending = (state: RootState) => state.categories.pending;

export default categoriesSlice.reducer;
