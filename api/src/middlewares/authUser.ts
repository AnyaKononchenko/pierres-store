import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_KEY } from '../util/secrets'
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '../helpers/apiError'
import userService from '../services/user.service'
import mongoose from 'mongoose'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Please, log in to continue.')
    }

    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, JWT_ACCESS_KEY, (error: any, decoded: any) => {
      if (error) {
        throw new ForbiddenError('Please, log in to continue.')
      }
      req.user = decoded.user
      next()
    })
  } catch (error) {
    next(error)
  }
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findById(
      new mongoose.Types.ObjectId(req.user as string)
    )
    if (!user) throw new BadRequestError('Such user does not exist.')
    if (!user.isAdmin) throw new ForbiddenError('Not an admin.')
    next()
  } catch (error) {
    next(error)
  }
}

export { isAuth, isAdmin }
