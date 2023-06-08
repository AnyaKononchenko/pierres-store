import express from 'express'
import { getStats } from '../controllers/helper.controller'

const router = express.Router()

router.get('/statistics', getStats)

export default router
