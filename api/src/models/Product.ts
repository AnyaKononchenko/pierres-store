import mongoose, { Schema, model } from 'mongoose'
import { ProductDocument } from '../@types/product'

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
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
    quality: {
      type: String,
      enum: ['Regular', 'Silver', 'Gold', 'Iridium'],
      default: 'Regular',
    },
    inStock: {
      type: Number,
      default: 0,
      min: 0,
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
    season: {
      type: String,
      enum: ['Spring', 'Summer', 'Fall', 'Winter'],
      required: false,
    },
    size: {
      type: String,
      enum: ['Regular', 'Large', 'Deluxe'],
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
