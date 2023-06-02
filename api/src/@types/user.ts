import { Document } from 'mongoose'
import { ObjectId } from './common'

export type UserDocument = Document & {
  name: string
  email: string
  password: string
  image: string
  address: string
  isAdmin: boolean
  isBanned: boolean
}

export type User = {
  name: string
  email: string
  password: string
  address: string
  image?: string
  isAdmin?: boolean
  isBanned?: boolean
}

export type UserUpdateFields = {
  name?: string
  address?: string
  image?: string
}

export type UserUpdatePassword = {
  email: string
}

export type UserLogin = {
  email: string
  password: string
}

export type UserQuery = {
  id: ObjectId
}
