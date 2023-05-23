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

const initialState: { userInfo: { isLoggedIn: boolean, user: UserLocal }, pending: false, response: CommonResponse } = { userInfo, pending: false, response: {} }

export const loginUser = createAsyncThunk(
  'auth/login',
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
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createUser = createAsyncThunk(
  'auth/registerUser',
  async (user: FormData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`, user, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/verify?token=${token}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const forgottenPassword = createAsyncThunk(
  'auth/forgottenPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      console.log('email', email)
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/forgotten-password`, { email })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const recoverPassword = createAsyncThunk(
  'auth/recoverPassword',
  async ({ token, password }: { token: string | null, password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/recover-password?token=${token}`, { password })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
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
    // register user
    builder.addCase(createUser.pending, (state) => {
      state.pending = true
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    // verify user
    builder.addCase(verifyUser.pending, (state) => {
      state.pending = true
    })
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      console.log("verified:", action.payload)
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    // forgotten password
    builder.addCase(forgottenPassword.pending, (state) => {
      state.pending = true
    })
    builder.addCase(forgottenPassword.fulfilled, (state, action) => {
      console.log("forgotten password:", action.payload)
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(forgottenPassword.rejected, (state, action) => {
      state.pending = false
      state.response = action.payload
    })
    // recover password
    builder.addCase(recoverPassword.pending, (state) => {
      state.pending = true
    })
    builder.addCase(recoverPassword.fulfilled, (state, action) => {
      console.log("recovered:", action.payload)
      state.pending = false
      state.response = action.payload
    })
    builder.addCase(recoverPassword.rejected, (state, action) => {
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
