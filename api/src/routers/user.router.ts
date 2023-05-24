import express from 'express'

import validate from '../middlewares/validators'
import upload from '../middlewares/uploadImage'
import {
  userValidator,
  UserUpdateFieldsValidator,
} from '../middlewares/validators/userValidator'
import {
  banFunctionality,
  deleteUser,
  forgottenPassword,
  getProfile,
  getUser,
  recoverPassword,
  signUp,
  updateUser,
  verify,
} from '../controllers/user.controller'
import { isUserExist } from '../middlewares/isExist'
import { isAdmin, isAuth } from '../middlewares/authUser'

const router = express.Router()

router.post(
  '/signup',
  upload('users').single('image'),
  userValidator(),
  validate,
  signUp
)

router.get('/verify', verify)
router.put('/ban', isAuth, isAdmin, isUserExist as any, banFunctionality as any)

router.put('/forgotten-password', forgottenPassword)
router.put('/recover-password', recoverPassword)
router.get('/profile', isAuth, getProfile)

router.delete('/', isAuth, deleteUser as any)
router.get('/', isAuth, isAdmin, getUser as any)
router.put(
  '/',
  isUserExist,
  upload('users').single('image') as any,
  UserUpdateFieldsValidator(),
  validate as any,
  updateUser
)

export default router
