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
  season?: Season
  size?: Size
  color?: string
}

enum Season {
  spring = 'Spring',
  summer = 'Summer',
  fall = 'Fall',
  winter = 'Winter',
}
enum Size {
  small = 'Regular',
  medium = 'Large',
  big = 'Delux',
}

enum Quality {
  regular = 'Regular',
  silver = 'Silver',
  gold = 'Gold',
  iridium = 'Iridium',
}

export type ProductRequestFields = {
  name: string //slug
}
