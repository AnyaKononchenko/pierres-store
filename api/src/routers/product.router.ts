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

const router = express.Router()

// router.post('/', isLoggedIn, isAdmin, upload('products').single('image'), productValidator(), validate, createProduct)
router.post(
  '/',
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
