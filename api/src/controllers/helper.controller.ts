import { Request, Response, NextFunction } from 'express'

import { sendResponse } from '../helpers/responseHandler'
import Category from '../models/Category'
import Product from '../models/Product'
import User from '../models/User'

export const getStats = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find()
    const products = await Product.find()
    const users = await User.find()

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Returned statistic data',
      payload: {
        categories: categories.length,
        products: products.length,
        users: users.length,
      },
    })
  } catch (error) {
    next(error)
  }
}
