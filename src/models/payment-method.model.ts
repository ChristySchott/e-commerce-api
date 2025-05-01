import { Joi } from 'celebrate'

export interface PaymentMethod {
  id: string
  description: string
  isActive: boolean
}

export const newPaymentMethodSchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().only().allow(true).default(true),
})

export const updatePaymentMethodSchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().required(),
})
