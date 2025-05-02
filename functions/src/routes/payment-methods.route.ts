import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { PaymentMethodsController } from '../controllers/payment-method.controller.js'
import {
  newPaymentMethodSchema,
  updatePaymentMethodSchema,
} from '../models/payment-method.model.js'

export const paymentMethodsRoutes = Router()

paymentMethodsRoutes.get('/payment-methods', asyncHandler(PaymentMethodsController.getAll))
paymentMethodsRoutes.get('/payment-methods/:id', asyncHandler(PaymentMethodsController.getById))
paymentMethodsRoutes.post(
  '/payment-methods',
  celebrate({
    [Segments.BODY]: newPaymentMethodSchema,
  }),
  asyncHandler(PaymentMethodsController.save),
)
paymentMethodsRoutes.put(
  '/payment-methods/:id',
  celebrate({
    [Segments.BODY]: updatePaymentMethodSchema,
  }),
  asyncHandler(PaymentMethodsController.update),
)
paymentMethodsRoutes.delete('/payment-methods/:id', asyncHandler(PaymentMethodsController.delete))
