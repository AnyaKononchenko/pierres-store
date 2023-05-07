import { Document } from 'mongoose'

export type UserDocument = Document & {
  name: string
  slug: string
  email: string
  password: string
  image: string
  isAdmin: boolean
  isBanned: boolean
}

export type User = {
  name: string
  slug: string
  email: string
  password: string
  image?: string
  isAdmin?: boolean
  isBanned?: boolean
}
