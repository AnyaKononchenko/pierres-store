import { RootState } from '../redux/store';

import { UserLocal } from '@customTypes/users';
import { createSlice } from '@reduxjs/toolkit';

const emptyUser: UserLocal = {
  name: "",
  image: "",
  accessToken: "",
  isAdmin: false,
}

const data: { isLoggedIn: boolean, user: UserLocal } =
  localStorage.getItem("user") !== null
    ? {
      isLoggedIn: true,
      user: JSON.parse(String(localStorage.getItem("userInfo")))
    }
    : {
      isLoggedIn: false,
      user: emptyUser,
    }


const initialState = data

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, user: { name, image, isAdmin } } = action.payload;
      state.user = { name, image, isAdmin, accessToken }
      state.isLoggedIn = true
      localStorage.setItem('userInfo', JSON.stringify(state.user))
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      return state = {
        isLoggedIn: false,
        user: emptyUser,
      }
    },
  },
})

export const { login, logout } = userSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
