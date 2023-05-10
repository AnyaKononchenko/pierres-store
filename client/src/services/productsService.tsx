import axios from "axios"
import { ProductResponse } from "@customTypes/common"

const BASE_URL = "http://localhost:3002/api/v1"

export const getProducts = async () => {
  try {
    const response = await axios.get<ProductResponse>(`${BASE_URL}/products`)
    if(response.statusText !== "OK") {
      throw new Error("Error occured! Try again later.")
    } 
    return response.data
  } catch (error) {
    console.log("ERROR", error)
  }
}