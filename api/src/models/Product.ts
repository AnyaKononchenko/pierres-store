import mongoose, { Schema, model } from 'mongoose'
import { ProductDocument } from '../@types/product'

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'default-product.png',
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 1,
      min: 1,
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export default model<ProductDocument>('Product', productSchema)
