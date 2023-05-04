import { RequestHandler, Request, Response, NextFunction } from 'express'

import { NotFoundError } from '../helpers/apiError'
import { CategoryRequestFields } from '../@types/category'
import categoryService from '../services/category.service'

export const isExist: RequestHandler = async (
  req: Request<{}, {}, {}, CategoryRequestFields>,
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
