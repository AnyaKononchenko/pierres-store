import { CategoryDocument } from "./categories"
import { ProductDocument, ProductWithCategory } from "./products"
import { UserDocument } from "./users"

export type ProductResponse = {
  status: "error" | "success"
  statusCode: number
  message: string
  payload?: ProductDocument | ProductDocument[] | null
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


export type ItemType = UserDocument | ProductWithCategory | CategoryDocument;

export enum LoginVariant {
  regular = 'regular',
  access = 'access'
}

export type StatisticInfo = {
  categories: number,
  products: number,
  users: number,
}
