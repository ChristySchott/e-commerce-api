import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { OrdersController } from '../controllers/orders.controller.js'
import {
  Order,
  OrderQueryParams,
  newOrderSchema,
  searchOrderSchema,
  updateStatusOrderSchema,
} from '../models/order.model.js'

export const ordersRoutes = Router()

ordersRoutes.get(
  '/orders',
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Search for orders'
    #swagger.description = 'Search for orders using optional filters such as companyId, date range, and status.'
    #swagger.parameters['companyId'] = { $ref: '#/components/parameters/companyId' }
    #swagger.parameters['startDate'] = { $ref: '#/components/parameters/startDate' }
    #swagger.parameters['endDate'] = { $ref: '#/components/parameters/endDate' }
    #swagger.parameters['orderStatus'] = { $ref: '#/components/parameters/orderStatus' }
    #swagger.responses[200] = {
      description: 'List of filtered orders',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/addOrder' }
          }
        }
      }
    }
  */
  celebrate({ [Segments.QUERY]: searchOrderSchema }),
  asyncHandler<null, Order[], null, OrderQueryParams>(OrdersController.search),
)

ordersRoutes.get(
  '/orders/:id/items',
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Get order items'
    #swagger.description = 'Retrieve all items from a specific order.'
    #swagger.parameters['id'] = { description: 'Order ID' }
    #swagger.responses[200] = {
      description: 'List of order items',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: { $ref: '#/components/schemas/Product' },
                quantity: { type: 'number', example: 2 },
                note: { type: 'string', nullable: true }
              }
            }
          }
        }
      }
    }
  */
  asyncHandler(OrdersController.getItemsByOrderId),
)

ordersRoutes.get(
  '/orders/:id',
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Get order by ID'
    #swagger.description = 'Retrieve order details by ID.'
    #swagger.parameters['id'] = { description: 'Order ID' }
    #swagger.responses[200] = {
      description: 'Order details',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/addOrder' }
        }
      }
    }
  */
  asyncHandler(OrdersController.getById),
)

ordersRoutes.post(
  '/orders',
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Create a new order'
    #swagger.description = 'Create a new order with customer, address, payment method, and items.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/addOrder' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Order created successfully'
    }
  */
  celebrate({
    [Segments.BODY]: newOrderSchema,
  }),
  asyncHandler(OrdersController.save),
)

ordersRoutes.patch(
  '/orders/:id/status',
  /*
    #swagger.tags = ['Orders']
    #swagger.summary = 'Update order status'
    #swagger.description = 'Update the status of a specific order.'
    #swagger.parameters['id'] = { description: 'Order ID' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/updateOrderStatus' }
        }
      }
    }
    #swagger.responses[204] = {
      description: 'Order status updated successfully'
    }
  */
  celebrate({
    [Segments.BODY]: updateStatusOrderSchema,
  }),
  asyncHandler(OrdersController.updateStatus),
)
