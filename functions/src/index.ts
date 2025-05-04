import 'dotenv/config'

import express from 'express'
import { initializeApp as initializeAdminApp } from 'firebase-admin/app'
import { initializeApp as initializeFirebaseApp } from 'firebase/app'
import { onRequest } from 'firebase-functions/https'

import { routes } from './routes/index.js'
import { auth } from './middlewares/auth.middleware.js'
import { errorHandler } from './middlewares/error-handler.middleware.js'
import { pageNotFoundError } from './middlewares/page-not-found.middleware.js'
import { swaggerDocs } from './routes/swagger-docs.route.js'

initializeAdminApp()
initializeFirebaseApp({
  apiKey: process.env.FIRE_API_KEY,
})

const app = express()

swaggerDocs(app)
auth(app)
routes(app)
pageNotFoundError(app)
errorHandler(app)

export const api = onRequest(app)
