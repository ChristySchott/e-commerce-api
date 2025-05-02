import { Joi } from 'celebrate'

import { Product } from './product.model.js'

export interface OrderItem {
  product: Product
  quantity: number
  note: string
}

export const orderItemSchema = Joi.object().keys({
  product: Joi.object()
    .keys({
      id: Joi.string().trim().required(),
    })
    .required(),
  quantity: Joi.number().integer().positive().required(),
  note: Joi.string().trim().allow(null).default(null),
})
