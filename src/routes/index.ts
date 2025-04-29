import express, { Express } from 'express'

import { authRoutes } from './auth.route.js'
import { userRoutes } from './users.route.js'

export const routes = (app: Express) => {
  app.use(express.json())
  app.use(authRoutes)
  app.use(userRoutes)
}
