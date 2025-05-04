import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { PaymentMethodsController } from '../controllers/payment-method.controller.js'
import {
  newPaymentMethodSchema,
  updatePaymentMethodSchema,
} from '../models/payment-method.model.js'

export const paymentMethodsRoutes = Router()

paymentMethodsRoutes.get(
  '/payment-methods',
  /*
    #swagger.tags = ['Payment Methods']
    #swagger.summary = 'Get all payment methods'
    #swagger.description = 'Retrieve all available payment methods.'
    #swagger.responses[200] = {
      description: 'List of payment methods',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/PaymentMethod' }
          }
        }
      }
    }
  */
  asyncHandler(PaymentMethodsController.getAll),
)

paymentMethodsRoutes.get(
  '/payment-methods/:id',
  /*
    #swagger.tags = ['Payment Methods']
    #swagger.summary = 'Get payment method by ID'
    #swagger.description = 'Retrieve a specific payment method by its ID.'
    #swagger.parameters['id'] = { description: 'Payment method ID' }
    #swagger.responses[200] = {
      description: 'Payment method data',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/PaymentMethod' }
        }
      }
    }
  */
  asyncHandler(PaymentMethodsController.getById),
)

paymentMethodsRoutes.post(
  '/payment-methods',
  /*
    #swagger.tags = ['Payment Methods']
    #swagger.summary = 'Create a new payment method'
    #swagger.description = 'Add a new payment method to the system.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/addPaymentMethod" }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Payment method created successfully'
    }
  */
  celebrate({ [Segments.BODY]: newPaymentMethodSchema }),
  asyncHandler(PaymentMethodsController.save),
)

paymentMethodsRoutes.put(
  '/payment-methods/:id',
  /*
    #swagger.tags = ['Payment Methods']
    #swagger.summary = 'Update a payment method'
    #swagger.description = 'Update the details of an existing payment method.'
    #swagger.parameters['id'] = { description: 'Payment method ID' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/updatePaymentMethod" }
        }
      }
    }
    #swagger.responses[204] = {
      description: 'Payment method updated successfully'
    }
  */
  celebrate({ [Segments.BODY]: updatePaymentMethodSchema }),
  asyncHandler(PaymentMethodsController.update),
)

paymentMethodsRoutes.delete(
  '/payment-methods/:id',
  /*
    #swagger.tags = ['Payment Methods']
    #swagger.summary = 'Delete a payment method'
    #swagger.description = 'Remove a payment method by its ID.'
    #swagger.parameters['id'] = { description: 'Payment method ID' }
    #swagger.responses[204] = {
      description: 'Payment method deleted successfully'
    }
  */
  asyncHandler(PaymentMethodsController.delete),
)
