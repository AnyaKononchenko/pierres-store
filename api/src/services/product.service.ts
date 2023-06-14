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

const findAll = async (
  query: FilterQuery
): Promise<{ info: object; products: ProductDocument[] }> => {
  // to filter
  const { category, price, sold, season, search, sort } = query

  const filterQuery = { category, price, sold, season }

  let filterString = JSON.stringify(filterQuery)
  filterString = filterString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  )

  const filters = JSON.parse(filterString)

  // to search
  const searchRegex = new RegExp(search, 'ig')

  // to sort
  let sortBy = '-createdAt'
  if (sort) {
    console.log(sort)
    sortBy = sort.split(',').join(' ')
  }

  // pagination
  const page = query.page || 1
  const limit = query.limit || 20
  const skip = (page - 1) * limit

  const foundProducts = await Product.find({
    $or: [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ],
    ...filters,
  })

  return {
    info: {
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(foundProducts.length / limit),
      totalAmount: foundProducts.length,
    },
    products: await Product.find({
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
      ...filters,
    })
      .sort(sortBy)
      .limit(limit)
      .skip(skip)
      .populate('category'),
  }
}

const findAllBySlug = async (slugs: string) => {
  const arrayOfSlugs = slugs.split(',')
  const products = await Product.find({ slug: { $in: arrayOfSlugs } })
  return products
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

  if (updatedProduct && oldImage) {
    if (update.image !== oldImage) {
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

const getTotalAmountOfProducts = async () => {
  const products = await Product.find({})
  return products.length
}

export default {
  create,
  findBySlug,
  findAll,
  update,
  remove,
  getTotalAmountOfProducts,
  findAllBySlug,
}
