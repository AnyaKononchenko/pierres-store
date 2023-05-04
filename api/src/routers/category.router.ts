import express from 'express'

import {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/category.controller'
import { isExist } from '../middlewares/categoryHandler'

const router = express.Router()

// Every path we define here will get /api/v1/categories prefix
router.post('/', createCategory)
router.get('/', getCategory)
router.put('/', isExist, updateCategory)
router.delete('/', deleteCategory)

export default router
