import express from 'express'

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProductsBySlug,
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
  productValidator() as any,
  validate,
  createProduct
)
router.post('/slugs', getProductsBySlug)
router.get('/', getProducts)
router.get('/:slug', getProduct)
router.put(
  '/',
  isAuth,
  isAdmin,
  isProductExist,
  upload('products').single('image'),
  productValidator() as any,
  validate,
  updateProduct
)
router.delete('/', isAuth, isAdmin, deleteProduct)

export default router

//TODO
// update route validator - make fields optional
