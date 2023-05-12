// @ts-nocheck
import { RootState } from '../redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Login, UserLocal } from '@customTypes/users';

const BASE_URL = "http://localhost:3002/api/v1";

const emptyUser: UserLocal = {
  name: "",
  image: "",
  accessToken: "",
  isAdmin: false,
}

const userInfo: { isLoggedIn: boolean, user: UserLocal } =
  localStorage.getItem("userInfo") !== null
    ? {
      isLoggedIn: true,
      user: JSON.parse(String(localStorage.getItem("userInfo")))
    }
    : {
      isLoggedIn: false,
      user: emptyUser,
    }

const initialState = { userInfo, pending: false, error: '' }

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: Login, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/logout`) 
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // login: (state, action) => {
    //   const { accessToken, user: { name, image, isAdmin } } = action.payload;
    //   state.user = { name, image, isAdmin, accessToken }
    //   state.isLoggedIn = true
    //   localStorage.setItem('userInfo', JSON.stringify(state.user))
    // },
    // logout: (state) => {
    //   localStorage.removeItem("userInfo");
    //   return state = {
    //     isLoggedIn: false,
    //     user: emptyUser,
    //   }
    // },
  },
  extraReducers: (builder) => {
    // log in
    builder.addCase(loginUser.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { accessToken, user: { name, image, isAdmin } } = action.payload.payload
      state.userInfo = { isLoggedIn: true, user: { name, image, isAdmin, accessToken } }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo.user))
      state.pending = false;
      state.error = '';
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload
    })
    // log out
    builder.addCase(logoutUser.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      localStorage.removeItem("userInfo");
      console.log("local storage", localStorage.getItem("userInfo"))
      state.userInfo = { isLoggedIn: false, user: emptyUser }
      state.pending = false;
      state.error = '';
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.pending = false;
      state.error = action.error.message ? action.error.message : "Error happened while trying to log in. Please, try again later."
    })
  },
})

// export const { login, logout } = userSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.user.userInfo.isLoggedIn;
export const selectUser = (state: RootState) => state.user.userInfo.user;
export const selectError = (state: RootState) => state.user.error;
export const selectPending = (state: RootState) => state.user.pending;

export default userSlice.reducer;
