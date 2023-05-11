import { ProductType } from "./products"
import { UserDocument } from "./users"

export type ProductResponse = {
  status: "error" | "success"
  statusCode: number
  message: string
  payload?: ProductType | ProductType[] | null
}

export type UserResponse = {
  status: "error" | "success"
  statusCode: number
  message: string
  payload?: UserDocument | null
}
export type UsersResponse = {
  status: "error" | "success"
  statusCode: number
  message: string
  payload?: UserDocument[] | null
}

export type CommonResponse = {
  status: string
  statusCode: number
  message: string
  payload?: object | object[] | null
}


export type PopUpProps = {
  variant: "success" | "error" | "info"
  message: string
};