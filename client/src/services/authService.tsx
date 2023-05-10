import { Login } from "@customTypes/users"
import axios from 'axios'

const BASE_URL = "http://localhost:3002/api/v1"

export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
