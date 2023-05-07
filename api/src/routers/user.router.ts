import express from 'express'

import validate from '../middlewares/validators'
import upload from '../middlewares/uploadImage'
import userValidator from '../middlewares/validators/userValidator'
import { signUp, verify } from '../controllers/user.controller'

const router = express.Router()

// router.post('/', isLoggedIn, isAdmin, upload('products').single('image'), productValidator(), validate, createProduct)
router.post(
  '/signup',
  upload('users').single('image'),
  userValidator(),
  validate,
  signUp
)

router.post('/verify', verify)

export default router
