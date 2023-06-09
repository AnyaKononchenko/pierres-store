import { Response } from 'express'
import { CustomResponse } from '../@types/common'

export const sendResponse = (res: Response, body: CustomResponse) => {
  return res.status(body.statusCode).json({
    status: 'success',
    statusCode: body.statusCode,
    message: body.message,
    payload: body.payload || [],
  })
}
