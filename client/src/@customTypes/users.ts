export type UserDocument = {
  _id?: string
  name: string
  email: string
  password: string
  address: string
  image?: string
  isAdmin?: boolean
  isBanned?: boolean
  createdAt?: string
  updatedAt?: string
}

export type UserLocal = {
  name: string
  image: string
  isAdmin: boolean
  isBanned: boolean
  accessToken: string
}

export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
}