// @ts-nocheck
import axios from 'axios';
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

const initialState: { user: UserDocument, users: UserDocument[], pending: false, response: CommonResponse } = { user: emptyUser, users: [], pending: false, response: {} }
// const initialState: { user: UserDocument, users: UserDocument[], pending: false, response: CommonResponse } = { user: emptyUser, users: [], pending: false, response: {status: null, statusCode: null, message: null, payload: null} }

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
      return rejectWithValue(error.response.data);
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/editUser',
  async ({ id, user, token }: { id: string | undefined, user: FormData, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/users?id=${id}`, user, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ id, token }: { id: string | undefined, token: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "authorization": `Bearer ${token}`
        }
      }
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users?id=${id}`, config)
      return response.data
    } catch (error) {
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
      state.response = action.payload
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.pending = false
      state.user = emptyUser
      state.response = action.payload
    })
    // get users
    builder.addCase(getUsers.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.payload
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.pending = false
      state.users = []
      state.response = action.payload
    })
    
    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.pending = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.pending = true
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
  },
})

export const selectUser = (state: RootState) => state.user.user;
export const selectUsers = (state: RootState) => state.user.users;
export const selectPending = (state: RootState) => state.user.pending;
export const selectResponse = (state: RootState) => state.user.response;

export default userSlice.reducer;
