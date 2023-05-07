import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { sendResponse } from '../../helpers/responseHandler'

const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendResponse(res, {
        statusCode: 422,
        message: errors.array()[0].msg,
      })
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

export default validate
