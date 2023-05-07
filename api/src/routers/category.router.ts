import express from 'express'

import {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/category.controller'
import { isExist } from '../middlewares/categoryHandler'
import categoryValidator from '../middlewares/validators/categoryValidator'
import validate from '../middlewares/validators'

const router = express.Router()

router.post('/', categoryValidator(), validate, createCategory)
router.get('/', getCategory)
router.put('/', isExist, categoryValidator(), validate, updateCategory)
router.delete('/', deleteCategory)

export default router
