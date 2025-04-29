import 'dotenv/config'

import express from 'express'
import { initializeApp as initializeAdminApp } from 'firebase-admin/app'
import { initializeApp as initializeFirebaseApp } from 'firebase/app'

import { routes } from './routes/index.js'
import { errorHandler } from './middlewares/error-handler.middleware.js'
import { pageNotFoundError } from './middlewares/page-not-found.middleware.js'

initializeAdminApp()
initializeFirebaseApp({
  apiKey: process.env.FIRE_API_KEY,
})
const app = express()

routes(app)
pageNotFoundError(app)
errorHandler(app)

app.listen(3000)
