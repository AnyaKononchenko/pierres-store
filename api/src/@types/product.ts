import { Document } from 'mongoose'
import { CategoryDocument } from './category'

export type ProductDocument = Document & {
  name: string
  slug: string
  image: string
  description: string
  price: number
  amount: number
  rating: number
  sold: number
  category: CategoryDocument
  size?: Size
  color?: string
}

enum Size {
  big = 'Big',
  medium = 'Medium',
  small = 'Small',
}
