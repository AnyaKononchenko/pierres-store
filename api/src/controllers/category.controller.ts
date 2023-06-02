import { Request, RequestHandler, Response, NextFunction } from 'express'
import slugify from 'slugify'

import Category from '../models/Category'
import categoryService from '../services/category.service'
import { CategoryRequestFields } from '../@types/category'
import { BadRequestError } from '../helpers/apiError'
import { sendResponse } from '../helpers/responseHandler'

export const createCategory: RequestHandler = async (
  req: Request<{}, {}, CategoryRequestFields, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body
    if (!name) throw new BadRequestError('Name of category is missing.')

    const category = new Category({
      name,
      slug: slugify(name.toLowerCase()),
    })
    await categoryService.create(category)

    sendResponse(res, {
      status: 'success',
      statusCode: 201,
      message: `Created a new category "${name}"`,
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
export const getCategory: RequestHandler = async (
  req: Request<{}, {}, {}, CategoryRequestFields>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const foundCategories = name
      ? await categoryService.findBySlug(name as string)
      : await categoryService.findAll()

    sendResponse(res, {
      status: 'success',
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

export const updateCategory: RequestHandler = async (
  req: Request<{}, {}, CategoryRequestFields, CategoryRequestFields>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const update = req.body

    const updatedCategory = await categoryService.update(name as string, update)

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Successfully updated a category',
      payload: updatedCategory,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const deleteCategory: RequestHandler = async (
  req: Request<{}, {}, {}, CategoryRequestFields>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    if (!name) throw new BadRequestError('Name of the category is missing.')

    await categoryService.remove(name)

    sendResponse(res, {
      status: 'success',
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
