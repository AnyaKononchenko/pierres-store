import { Schema, model } from 'mongoose'
import { CategoryDocument } from '../@types/category'

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
})

export default model<CategoryDocument>('Category', categorySchema)
