import { Joi } from 'celebrate'

import { Category } from './category.model.js'

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: Category
  isActive: boolean
}

export const newProductSchema = Joi.object().keys({
  name: Joi.string().trim().min(3).required(),
  description: Joi.string().trim().allow(null).default(null),
  price: Joi.number().positive().required(),
  image: Joi.string().base64().allow(null).default(null),
  category: Joi.object()
    .keys({
      id: Joi.string().trim().required(),
    })
    .required(),
  isActive: Joi.boolean().only().allow(true).default(true),
})

export const updateProductSchema = Joi.object().keys({
  name: Joi.string().trim().min(3).required(),
  description: Joi.string().allow(null).default(null),
  price: Joi.number().positive().required(),
  image: Joi.alternatives()
    .try(Joi.string().base64(), Joi.string().uri())
    .allow(null)
    .default(null),
  category: Joi.object()
    .keys({
      id: Joi.string().trim().required(),
    })
    .required(),
  isActive: Joi.boolean().required(),
})

export const searchProductSchema = Joi.object().keys({
  categoryId: Joi.string().trim().required(),
})
