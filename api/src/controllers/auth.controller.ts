import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import userService from '../services/user.service'
import ApiError, {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import { sendResponse } from '../helpers/responseHandler'
import { UserLogin } from '../@types/user'
import { comparePassword } from '../util/bcrypt'
import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '../util/secrets'

export const login = async (
  req: Request<{}, {}, UserLogin, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await userService.findByEmail(email)

    if (!user) {
      throw new NotFoundError(`User with the email '${email}' is not found`)
    }

    const isPasswordMatch = await comparePassword(password, user.password)

    if (!isPasswordMatch) throw new UnauthorizedError('Incorrect Password!')

    const accessToken = jwt.sign({ user: user._id }, JWT_ACCESS_KEY, {
      expiresIn: '60m',
    })
    // const refreshToken = jwt.sign({ user: user.email }, JWT_REFRESH_KEY, {expiresIn: "1m"})

    res.cookie('auth', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // millisecond * second * minute * hour * day
    })

    sendResponse(res, {
      status: 'success',
      statusCode: 201,
      message: 'Successfully logged in.',
      payload: { accessToken, user },
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// TODO ?: work on it later
// export const refresh = async (
//   req: Request<{}, {}, UserLogin, {}>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const cookies = req.cookies;

//     if(!cookies?.auth) return new UnauthorizedError();

//     const refreshToken = cookies.auth;

//     const accessToken = jwt.verify(
//       refreshToken,
//       JWT_REFRESH_KEY,
//       async (error: any, decoded: any) => {
//         if(error) throw new ForbiddenError()

//         const foundUser = await userService.findByEmail(decoded.email)

//         console.log("found user", foundUser)

//         if(!foundUser) throw new UnauthorizedError()

//         return jwt.sign({ user: foundUser._id }, JWT_ACCESS_KEY, {expiresIn: "15s"})
//       }
//     )

//     sendResponse(res, {
//       statusCode: 201,
//       message: `A user session can be continued.`,
//       payload: {accessToken},
//     })

//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

export const logout = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies

    if (!cookies?.auth) throw new ApiError(204, 'No Content')

    res.clearCookie('auth', { httpOnly: true })

    sendResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'Successfully logged out.',
      payload: {},
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
