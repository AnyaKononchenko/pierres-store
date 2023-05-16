import express from 'express'

import {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/category.controller'
import { isCategoryExist } from '../middlewares/isExist'
import categoryValidator from '../middlewares/validators/categoryValidator'
import validate from '../middlewares/validators'
import { isAuth } from '../middlewares/authUser'
import { isAdmin } from '../middlewares/authUser'

const router = express.Router()

router.post('/', isAuth, isAdmin, categoryValidator(), validate, createCategory)
router.get('/', getCategory)
router.put(
  '/',
  isAuth,
  isAdmin,
  isCategoryExist,
  categoryValidator(),
  validate,
  updateCategory
)
router.delete('/', isAuth, isAdmin, deleteCategory)

export default router
