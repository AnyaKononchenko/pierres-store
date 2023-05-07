import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  slug: string
  image: string
  description: string
  price: number
  inStock: number
  quality: Quality
  reviews: number
  sold: number
  category: mongoose.Types.ObjectId
  size?: Size
  color?: string
}

enum Size {
  small = 'Small',
  medium = 'Medium',
  big = 'Big',
}

enum Quality {
  regular = 'Regular',
  silver = 'Silver',
  gold = 'Gold',
  iridium = 'Iridium',
}
