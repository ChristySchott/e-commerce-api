import 'dotenv/config'

import express from 'express'
import { initializeApp } from 'firebase-admin/app'

import { routes } from './routes/index.js'

initializeApp()
const app = express()

routes(app)

app.listen(3000)
