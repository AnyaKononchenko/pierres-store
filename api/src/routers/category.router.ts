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

const router = express.Router()

router.post('/', categoryValidator(), validate, createCategory)
router.get('/', getCategory)
router.put('/', isCategoryExist, categoryValidator(), validate, updateCategory)
router.delete('/', deleteCategory)

export default router
