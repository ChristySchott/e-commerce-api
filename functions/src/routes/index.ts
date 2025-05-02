import express, { Express } from 'express'

import { allowAnonymousUser } from '../middlewares/allow-anonymous-user.middleware.js'

import { authRoutes } from './auth.route.js'
import { usersRoutes } from './users.route.js'
import { companiesRoutes } from './companies.route.js'
import { categoriesRoutes } from './categories.route.js'
import { productsRoutes } from './products.route.js'
import { paymentMethodsRoutes } from './payment-methods.route.js'
import { ordersRoutes } from './orders.route.js'

export const routes = (app: Express) => {
  app.use(express.json({ limit: '5mb' }))
  app.use(authRoutes)
  app.use(allowAnonymousUser)
  app.use(usersRoutes)
  app.use(companiesRoutes)
  app.use(categoriesRoutes)
  app.use(productsRoutes)
  app.use(paymentMethodsRoutes)
  app.use(ordersRoutes)
}
