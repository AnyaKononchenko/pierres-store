import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

import Product from '../models/Product'
import productService from '../services/product.service'
import { FilterQuery, ProductRequestFields, Season } from '../@types/product'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import { sendResponse } from '../helpers/responseHandler'

export const createProduct = async (
  req: Request<{}, {}, ProductRequestFields, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file
    const product = new Product({
      ...req.body,
      slug: slugify(req.body.name.toLowerCase()),
      image: image && image.filename,
    })
    await productService.create(product)

    sendResponse(res, {
      status: 'success',
      statusCode: 201,
      message: `Created a new product '${req.body.name}'`,
      payload: product,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getProductsBySlug = async (
  req: Request<{}, {}, { slugs: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slugs } = req.body
    const foundProducts = await productService.findAllBySlug(slugs)

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Returned products',
      payload: foundProducts,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getProducts = async (
  req: Request<{}, {}, {}, FilterQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundProducts = await productService.findAll(req.query)

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Returned products',
      payload: foundProducts,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getProduct = async (
  req: Request<{ slug: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const foundProduct = await productService.findBySlug(slug)

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Returned product',
      payload: foundProduct,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const updateProduct = async (
  req: Request<{}, {}, ProductRequestFields, ProductRequestFields>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const image = req.file

    const update = image ? { ...req.body, image: image.filename } : req.body

    const updatedProduct = await productService.update(name as string, update)

    if (!updatedProduct) {
      throw new InternalServerError(
        `Could not update a product '${name}'. Try again later.`
      )
    }

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Successfully updated a product',
      payload: updatedProduct,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const deleteProduct = async (
  req: Request<{}, {}, {}, ProductRequestFields>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query

    const foundProduct = await Product.findOne({ slug: name })

    if (!foundProduct)
      throw new NotFoundError(`A product '${name}' does not exist.`)

    const removedProduct = await productService.remove(name)
    if (removedProduct.deletedCount === 0) {
      throw new InternalServerError(
        `Could not delete a product '${name}'. Try again later.`
      )
    }

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: `Deleted a product '${name}'`,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
