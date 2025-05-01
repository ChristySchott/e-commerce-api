import { Joi } from 'celebrate'

export interface Category {
  id: string
  description: string
  isActive: boolean
}

export const newCategorySchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().only().allow(true).default(true),
})

export const updateCategorySchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().required(),
})
