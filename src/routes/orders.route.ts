import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { OrdersController } from '../controllers/orders.controller.js'
import { newOrderSchema } from '../models/order.model.js'

export const ordersRoutes = Router()

ordersRoutes.get('/orders', asyncHandler(OrdersController.getAll))
ordersRoutes.get('/orders/:id', asyncHandler(OrdersController.getById))
ordersRoutes.post(
  '/orders',
  celebrate({
    [Segments.BODY]: newOrderSchema,
  }),
  asyncHandler(OrdersController.save),
)
