// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CategoryDocument } from '@customTypes/categories';

const emptyError: CommonResponse = {
  status: "",
  statusCode: 0,
  message: "",
}

const initialState: { categories: CategoryDocument[], pending: boolean, error: CommonResponse } = { categories: [], pending: false, error: emptyError }


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

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

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
  },
})


export const selectCategories = (state: RootState) => state.categories.categories;
export const selectError = (state: RootState) => state.categories.error;
export const selectPending = (state: RootState) => state.categories.pending;

export default categoriesSlice.reducer;
