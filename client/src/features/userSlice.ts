// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { UserDocument } from '@customTypes/users';
import { CommonResponse } from '@customTypes/common';

const emptyUser: UserDocument = {
  _id: "",
  name: "",
  email: "",
  password: "",
  address: "",
  image: "",
  isAdmin: false,
  isBanned: false,
  createdAt: "",
  updatedAt: "",
  accessToken: "",
}

const initialState : {user: UserDocument, pending: false, error: CommonResponse} = { user: emptyUser, pending: false, error: {} }

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/profile`, config)
      return response.data
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // get profile
    builder.addCase(getProfile.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload.payload
      state.pending = false
      state.error = ''
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.pending = false
      state.user = emptyUser
      state.error = action.payload
    })
  },
})

export const selectUser = (state: RootState) => state.user.user;
export const selectError = (state: RootState) => state.user.error;
export const selectPending = (state: RootState) => state.user.pending;

export default userSlice.reducer;
