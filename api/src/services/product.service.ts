import slugify from 'slugify'

import Product from '../models/Product'
import { ProductDocument } from '../@types/product'
import { InternalServerError, NotFoundError } from '../helpers/apiError'
import { DeletedDocument } from '../@types/common'
import { removeFile } from '../util/filer'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
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

  if (update.name) {
    update.slug = slugify(update.name.toLowerCase())
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { slug: productName },
    update,
    { new: true }
  )

  if (!updatedProduct) {
    throw new InternalServerError(
      `Could not update a product '${productName}'. Try again later.`
    )
  }

  if (oldImage) {
    removeFile(`images/products/${oldImage}`)
  }

  return updatedProduct
}

const remove = async (productName: string): Promise<DeletedDocument> => {
  const foundProduct = await Product.findOne({ slug: productName })

  if (!foundProduct)
    throw new NotFoundError(`A product '${productName}' does not exist.`)

  const removedProduct: DeletedDocument = await foundProduct.deleteOne()

  if (removedProduct.deletedCount === 0) {
    throw new InternalServerError(
      `Could not delete a product '${productName}'. Try again later.`
    )
  }

  removeFile(`images/products/${foundProduct.image}`)

  return removedProduct
}

export default {
  create,
  findBySlug,
  findAll,
  update,
  remove,
}
