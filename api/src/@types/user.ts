import { Document } from 'mongoose'

export type UserDocument = Document & {
  name: string
  email: string
  password: string
  image: string
  purchaseHistory: string[]
  isAdmin: boolean
  isBanned: boolean
}
