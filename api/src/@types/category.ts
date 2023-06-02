import mongoose, { Document } from 'mongoose'

export type CategoryDocument = Document & {
  name: string
  slug: string
}

export type CategoryRequestFields = {
  name?: string //slug
}
