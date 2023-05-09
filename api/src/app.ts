import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import categoryRouter from './routers/category.router'
import productRouter from './routers/product.router'
import userRouter from './routers/user.router'
import authRouter from './routers/auth.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
// app.use(apiContentType)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// Set up routers
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

// Make public folder accessable
app.use('/api/media', express.static(path.join(__dirname, 'public')))

// Custom API error handler
app.use(apiErrorHandler)

export default app
