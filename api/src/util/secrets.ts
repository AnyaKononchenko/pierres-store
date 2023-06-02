import dotenv from 'dotenv'
import fs from 'fs'

import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

export const MONGODB_URI = process.env['MONGODB_ULR'] as string
export const CLIENT_URL = process.env['CLIENT_URL'] as string

export const JWT_SECRET = process.env['JWT_TOKEN_PR_KEY'] as string
export const JWT_ACCESS_KEY = process.env['JWT_ACCESS_KEY'] as string
export const JWT_REFRESH_KEY = process.env['JWT_REFRESH_KEY'] as string

export const SMTP_USERNAME = process.env['SMTP_USERNAME'] as string
export const SMTP_PASSWORD = process.env['SMTP_PASSWORD'] as string

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'] as string
export const GOOGLE_CLIENT_SECRET = process.env[
  'GOOGLE_CLIENT_SECRET'
] as string

if (!JWT_SECRET) {
  logger.error('No client secret. Set JWT_SECRET environment variable.')
  process.exit(1)
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    )
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    )
  }
  process.exit(1)
}
