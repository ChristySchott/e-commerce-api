import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { OrdersController } from '../controllers/orders.controller.js'
import { OrderQueryParams, newOrderSchema, searchOrderSchema } from '../models/order.model.js'

export const ordersRoutes = Router()

ordersRoutes.get(
  '/orders',
  celebrate({ [Segments.QUERY]: searchOrderSchema }),
  asyncHandler<null, null, null, OrderQueryParams>(OrdersController.search),
)
ordersRoutes.get('/orders/:id/items', asyncHandler(OrdersController.getItemsByOrderId))
ordersRoutes.get('/orders/:id', asyncHandler(OrdersController.getById))
ordersRoutes.post(
  '/orders',
  celebrate({
    [Segments.BODY]: newOrderSchema,
  }),
  asyncHandler(OrdersController.save),
)
