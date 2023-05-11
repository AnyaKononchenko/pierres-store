import { ProductType } from "./products"
import { UserDocument } from "./users"

export type ProductResponse = {
  status: number
  message: string
  payload?: ProductType | ProductType[] | null
}

export type UserResponse = {
  status: number
  message: string
  payload?: UserDocument | null
}
export type UsersResponse = {
  status: number
  message: string
  payload?: UserDocument[] | null
}

export type PopUpProps = {
  variant: "success" | "error" | "info"
  message: string
};