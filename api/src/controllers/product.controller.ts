import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

import Product from '../models/Product'
import productService from '../services/product.service'
import { ProductRequestFields } from '../@types/product'
import { BadRequestError } from '../helpers/apiError'
import { sendResponse } from '../helpers/responseHandler'

export const createProduct = async (
  req: Request<{}, {}, ProductRequestFields, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file

    const category = new Product({
      ...req.body,
      slug: slugify(req.body.name.toLowerCase()),
      image: image && image.filename,
    })
    await productService.create(category)

    sendResponse(res, {
      statusCode: 201,
      message: `Created a new product '${req.body.name}'`,
      payload: category,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// get all categories or provide query param as name and get one
export const getProduct = async (
  req: Request<{}, {}, {}, ProductRequestFields>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const foundCategories = name
      ? await productService.findBySlug(name as string)
      : await productService.findAll()

    sendResponse(res, {
      statusCode: 200,
      message: 'Returned categories',
      payload: foundCategories,
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
    console.log('name', name)

    const update = image ? { ...req.body, image: image.filename } : req.body

    const updatedProduct = await productService.update(name as string, update)

    sendResponse(res, {
      statusCode: 200,
      message: 'Successfully updated a category',
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

    await productService.remove(name)

    sendResponse(res, {
      statusCode: 200,
      message: `Deleted a category '${name}'`,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
