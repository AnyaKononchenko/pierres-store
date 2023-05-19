//@ts-nocheck
import slugify from 'slugify'

import Product from '../models/Product'
import { ProductDocument, Season } from '../@types/product'
import { InternalServerError, NotFoundError } from '../helpers/apiError'
import { DeletedDocument } from '../@types/common'
import { removeFile } from '../util/filer'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  if (product.season[0].length > 1) {
    product.season = product.season[0].split(',') as Season[]
  } else {
    product.season = ['Not-Seasonal' as Season.notSeasonal]
  }
  const createdProduct = await product.save()
  if (!createdProduct) throw new InternalServerError()
  // moveFile(`./src/public/images/temp-products/${product.image}`, `./src/public/images/products/${product.image}`)
  return createdProduct
}

const findBySlug = async (productName: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findOne({
    slug: productName.toLowerCase(),
  }).populate('category')

  if (!foundProduct) {
    throw new NotFoundError(`Product '${productName}' not found`)
  }

  return foundProduct
}

const findAll = async (): Promise<ProductDocument[]> => {
  return await Product.find().sort({ createdAt: -1 }).populate('category')
}
const update = async (
  productName: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  let oldImage
  if (update.image) {
    const product = await Product.findOne({ slug: productName })
    oldImage = product && product.image
  }

  update.season = update.season.split(',') as Season[]
  if (update.season.includes('Not-Seasonal')) {
    update.season = update.season.filter((season) => season !== 'Not-Seasonal')
  }

  if (update.name) {
    update.slug = slugify(update.name.toLowerCase())
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { slug: productName },
    update,
    { new: true }
  )

  if (updatedProduct) {
    if (oldImage) {
      removeFile(`images/products/${oldImage}`)
    }
  }

  return updatedProduct
}

const remove = async (productName: string): Promise<DeletedDocument> => {
  const foundProduct = await Product.findOne({ slug: productName })

  const removedProduct: DeletedDocument = foundProduct
    ? await foundProduct.deleteOne()
    : null

  if (removedProduct) {
    foundProduct && removeFile(`images/products/${foundProduct.image}`)
  }

  return removedProduct
}

export default {
  create,
  findBySlug,
  findAll,
  update,
  remove,
}
