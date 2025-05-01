import express, { Express } from 'express'

import { authRoutes } from './auth.route.js'
import { usersRoutes } from './users.route.js'
import { companiesRoutes } from './companies.route.js'
import { categoriesRoutes } from './categories.route.js'

export const routes = (app: Express) => {
  app.use(express.json({ limit: '5mb' }))
  app.use(authRoutes)
  app.use(usersRoutes)
  app.use(companiesRoutes)
  app.use(categoriesRoutes)
}
