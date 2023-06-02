import axios from "axios"
import { UserResponse } from "@customTypes/common"

export const getProfile = async (token: string) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const response = await axios.get<UserResponse>(`${process.env.REACT_APP_BASE_URL}/users/profile`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}