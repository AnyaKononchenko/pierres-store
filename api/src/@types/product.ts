import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  slug: string
  image: string
  description: string
  price: number
  inStock: number
  quality: Quality
  sold: number
  category: mongoose.Types.ObjectId
  season: Season[]
  size?: Size
  color?: string
}

export enum Season {
  spring = 'Spring',
  summer = 'Summer',
  fall = 'Fall',
  winter = 'Winter',
  notSeasonal = 'Not-Seasonal',
}

export enum Size {
  small = 'Regular',
  medium = 'Large',
  big = 'Deluxe',
}

export enum Quality {
  regular = 'Regular',
  silver = 'Silver',
  gold = 'Gold',
  iridium = 'Iridium',
}

export type ProductRequestFields = {
  name: string //slug
}

export type FilterQuery = {
  name: string
  filters: string
  sort: string
  order: string
  page: number
  limit: number
}
