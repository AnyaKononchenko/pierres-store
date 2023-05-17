// @ts-nocheck
import { RootState } from '../redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { Login, UserLocal } from '@customTypes/users'
import { CommonResponse } from '@customTypes/common'

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

const initialState: { userInfo: { isLoggedIn: boolean, user: UserLocal }, pending: false, response: CommonResponse } = { userInfo, pending: false, response: {}}

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: Login, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // log in
    builder.addCase(loginUser.pending, (state) => {
      state.pending = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { accessToken, user: { name, image, isAdmin } } = action.payload.payload
      state.userInfo = { isLoggedIn: true, user: { name, image, isAdmin, accessToken } }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo.user))
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    // log out
    builder.addCase(logoutUser.pending, (state) => {
      state.pending = true
    })
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      localStorage.removeItem("userInfo")
      state.userInfo = { isLoggedIn: false, user: emptyUser }
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
  },
})

export const selectIsLoggedIn = (state: RootState) => state.auth.userInfo.isLoggedIn
export const selectUser = (state: RootState) => state.auth.userInfo.user
export const selectResponse = (state: RootState) => state.auth.response
export const selectPending = (state: RootState) => state.auth.pending

export default authSlice.reducer
