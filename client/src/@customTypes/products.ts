import { CategoryDocument } from "./categories"

export type ProductDocument = {
  name: string
  slug?: string
  image?: File
  description: string
  price: number
  inStock: number
  quality: Quality
  sold: number
  category: string
  season: Season[]
  size?: Size
  color?: string
}
export type ProductWithCategory = {
  name: string
  slug?: string
  image?: File
  description: string
  price: number
  inStock: number
  quality: Quality
  sold: number
  category: CategoryDocument
  season: Season[]
  size?: Size
  color?: string
}

export type FilterQuery = {
  category: string[]
  price: { minPrice: number, maxPrice: number }
  sold?: { min: number, max: number }
  season?: string
  search: string
  sort: string[]
  page: number
  limit: number
}

export type PaginationInfo = {
  currentPage: number
  limit: number
  totalAmount: number
  totalPages: number
}

export enum Season {
  spring = 'Spring',
  summer = 'Summer',
  fall = 'Fall',
  winter = 'Winter',
  notSeasonal = 'Not-Seasonal'
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

export type CartItem = {
  name: string,
  amount: number,
}
