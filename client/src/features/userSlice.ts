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

const emptyError: CommonResponse = {
  status: "",
  statusCode: 0,
  message: "",
}

const initialState : {user: UserDocument, users: UserDocument[], pending: false, error: CommonResponse} = { user: emptyUser, pending: false, error: emptyError }

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

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (token: string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, config)
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
    // get users
    builder.addCase(getUsers.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.payload
      state.pending = false
      state.error = emptyError
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.pending = false
      state.users = []
      state.error = action.payload
    })
  },
})

export const selectUser = (state: RootState) => state.user.user;
export const selectUsers = (state: RootState) => state.user.users;
export const selectError = (state: RootState) => state.user.error;
export const selectPending = (state: RootState) => state.user.pending;

export default userSlice.reducer;
