import axios from "axios"
import { UserResponse } from "@customTypes/common"

const BASE_URL = "http://localhost:3002/api/v1"

export const getProfile = async (token: string) => {
  try {
  
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const response = await axios.get<UserResponse>(`${BASE_URL}/users/profile`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}