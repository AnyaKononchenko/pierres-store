import { Request, Response, NextFunction } from 'express'

import { NotFoundError } from '../helpers/apiError'
import { Slug } from '../@types/common'
import categoryService from '../services/category.service'
import productService from '../services/product.service'
import userService from '../services/user.service'
import { UserQuery } from '../@types/user'

export const isCategoryExist = async (
  req: Request<{}, {}, {}, Slug>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const found = await categoryService.findBySlug(name as string)
    if (!found) throw new NotFoundError(`A category '${name}' does not exist.`)
    next()
  } catch (error) {
    next(error)
  }
}

export const isProductExist = async (
  req: Request<{}, {}, {}, Slug>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const found = await productService.findBySlug(name as string)
    if (!found) throw new NotFoundError(`A product '${name}' does not exist.`)
    next()
  } catch (error) {
    next(error)
  }
}

export const isUserExist = async (
  req: Request<{}, {}, {}, UserQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query
    const found = await userService.findById(id)
    if (!found)
      throw new NotFoundError(`A user with ID: '${id}' does not exist.`)
    next()
  } catch (error) {
    next(error)
  }
}
