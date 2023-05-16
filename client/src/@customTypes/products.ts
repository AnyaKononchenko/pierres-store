import { CategoryDocument } from "./categories"

export type ProductDocument = {
  name: string
  slug?:string
  image?: File
  description: string
  price: number
  inStock: number
  quality: Quality
  sold: number
  category: string
  season?: Season
  size?: Size
  color?: string
}
export type ProductWithCategory = {
  name: string
  slug?:string
  image?: File
  description: string
  price: number
  inStock: number
  quality: Quality
  sold: number
  category: CategoryDocument
  season?: Season
  size?: Size
  color?: string
}

export enum Season {
  spring = 'Spring',
  summer = 'Summer',
  fall = 'Fall',
  winter = 'Winter',
}

export enum Size {
  regular = 'Regular',
  large = 'Large',
  deluxe = 'Deluxe',
}

export enum Quality {
  regular = 'Regular',
  silver = 'Silver',
  gold = 'Gold',
  iridium = 'Iridium',
}
