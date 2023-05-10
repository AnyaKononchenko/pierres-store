import express from 'express'

import {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product.controller'
import { isProductExist } from '../middlewares/isExist'
import productValidator from '../middlewares/validators/productValidator'
import validate from '../middlewares/validators'
import upload from '../middlewares/uploadImage'
import { isAuth, isAdmin } from '../middlewares/authUser'

const router = express.Router()

router.post(
  '/',
  isAuth,
  isAdmin,
  upload('products').single('image'),
  productValidator(),
  validate,
  createProduct
)
router.get('/', getProduct)
router.put(
  '/',
  isProductExist,
  upload('products').single('image'),
  productValidator(),
  validate,
  updateProduct
)
router.delete('/', deleteProduct)

export default router

//TODO
// update route validator - make fields optional
