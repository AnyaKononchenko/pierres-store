import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import userService from '../services/user.service'
import { Slug, Token } from '../@types/common'
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import { sendResponse } from '../helpers/responseHandler'
import {
  User as UserType,
  UserDocument,
  UserQuery,
  UserUpdateFields,
} from '../@types/user'
import mongoose from 'mongoose'
import { JWT_SECRET } from '../util/secrets'

export const signUp = async (
  req: Request<{}, {}, UserType, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file

    const user = new User({
      ...req.body,
      image: image && image.filename,
    })

    const token = await userService.signUp(user)

    sendResponse(res, {
      status: 'success',
      statusCode: 201,
      message: `Registered a new user '${user.name}'. Please, verify your email address to finish registration.`,
      payload: { token },
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const verify = async (
  req: Request<{}, {}, Slug, { token: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query

    jwt.verify(token, JWT_SECRET, async (error: any, decoded: any) => {
      if (error) {
        throw new BadRequestError('Token has expired.')
      }
      const verifiedUser = await userService.verify(decoded as Token)

      if (!verifiedUser)
        throw new InternalServerError(
          'Could not verify this user. Try again later.'
        )

      sendResponse(res, {
        status: 'success',
        statusCode: 201,
        message: `Verified the user '${verifiedUser.name}'. Welcome to Pierre's General Store`,
        payload: verifiedUser,
      })
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
export const getUser = async (
  req: Request<{}, {}, {}, UserQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query
    const foundUsers = id
      ? await userService.findById(id)
      : await userService.findAll()

    if (!foundUsers) {
      throw new NotFoundError(`User with the ID: '${id}' is not found`)
    }
    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Returned users',
      payload: foundUsers,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const updateUser = async (
  req: Request<{}, {}, UserUpdateFields, UserQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query
    const image = req.file
    const { name, address } = req.body

    const update = image
      ? { name, address, image: image.filename }
      : { name, address }

    const updatedUser = await userService.update(id, update)

    if (!updatedUser) {
      throw new InternalServerError(
        `Could not update a user with ID: '${id}'. Try again later.`
      )
    }
    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Successfully updated a user',
      payload: updatedUser,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const deleteUser = async (
  req: Request<{}, {}, {}, UserQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query

    const foundUser = await User.findById(id)

    if (!foundUser) throw new NotFoundError(`A user '${id}' does not exist.`)

    const removedUser = await userService.remove(id)

    if (removedUser.deletedCount === 0) {
      throw new InternalServerError(
        `Could not delete a user '${id}'. Try again later.`
      )
    }

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: `Deleted a user '${id}'`,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getProfile = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new ForbiddenError()
    console.log('req.user', req.user)
    const id = new mongoose.Types.ObjectId(req.user as string)

    const user = await userService.findById(id)

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Profile of the user',
      payload: user,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
