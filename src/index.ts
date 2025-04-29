import 'dotenv/config'

import express from 'express'
import { initializeApp } from 'firebase-admin/app'

import { routes } from './routes/index.js'
import { errorHandler } from './middlewares/error-handler.middleware.js'
import { pageNotFoundError } from './middlewares/page-not-found.middleware.js'

initializeApp()
const app = express()

routes(app)
pageNotFoundError(app)
errorHandler(app)

app.listen(3000)
