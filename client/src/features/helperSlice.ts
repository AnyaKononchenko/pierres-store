// @ts-nocheck
import axios from 'axios';
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonResponse, StatisticInfo } from '@customTypes/common';

const initialState: { stats: StatisticInfo, pending: boolean, response: CommonResponse } = { stats: {}, pending: false, response: {}};

export const getStats = createAsyncThunk(
  'utils/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/statistics`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const cartSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get stats
    builder.addCase(getStats.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.stats = action.payload.payload;
      state.pending = false;
      state.response = action.payload;
    })
    builder.addCase(getStats.rejected, (state, action) => {
      state.pending = false;
      state.response = action.payload;
    })
  }
})

export const selectStats = (state: RootState) => state.utils.stats;
export const selectResponse = (state: RootState) => state.utils.response;
export const selectPending = (state: RootState) => state.utils.pending;

export default cartSlice.reducer;
