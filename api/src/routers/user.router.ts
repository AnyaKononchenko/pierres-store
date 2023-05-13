import express from 'express'

import validate from '../middlewares/validators'
import upload from '../middlewares/uploadImage'
import {
  userValidator,
  UserUpdateFieldsValidator,
} from '../middlewares/validators/userValidator'
import {
  deleteUser,
  getProfile,
  getUser,
  signUp,
  updateUser,
  verify,
} from '../controllers/user.controller'
import { isUserExist } from '../middlewares/isExist'
import { isAdmin, isAuth } from '../middlewares/authUser'

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
router.put(
  '/',
  isUserExist,
  upload('users').single('image') as any,
  UserUpdateFieldsValidator(),
  validate as any,
  updateUser
)
router.delete('/', deleteUser)
router.get('/profile', isAuth, getProfile)
router.get('/', isAuth, isAdmin, getUser as any)

export default router
