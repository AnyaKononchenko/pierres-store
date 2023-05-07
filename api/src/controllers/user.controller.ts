import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

import User from '../models/User'
import userService from '../services/user.service'
import { Slug } from '../@types/common'
import { BadRequestError } from '../helpers/apiError'
import { sendResponse } from '../helpers/responseHandler'

export const signUp = async (
  req: Request<{}, {}, Slug, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file

    const user = new User({
      ...req.body,
      slug: slugify(req.body.name.toLowerCase()),
      image: image && image.filename,
    })

    const token = await userService.signUp(user)

    sendResponse(res, {
      statusCode: 201,
      message: `Registered a new user '${user.name}'. Please, verify your email address to finish registration.`,
      payload: token,
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

    const verifiedUser = await userService.verify(token)

    sendResponse(res, {
      statusCode: 201,
      message: `Verified the user '${verifiedUser.name}'. Welcome to Pierre's General Store`,
      payload: verifiedUser,
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
  req: Request<{}, {}, {}, Slug>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const foundUsers = name
      ? await userService.findBySlug(name as string)
      : await userService.findAll()

    sendResponse(res, {
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
  req: Request<{}, {}, Slug, Slug>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query
    const image = req.file

    const update = image ? { ...req.body, image: image.filename } : req.body

    const updatedUser = await userService.update(name as string, update)

    sendResponse(res, {
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
  req: Request<{}, {}, {}, Slug>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query

    await userService.remove(name)

    sendResponse(res, {
      statusCode: 200,
      message: `Deleted a user '${name}'`,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
