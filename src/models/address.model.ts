import { Joi } from 'celebrate'

export interface Address {
  zipcode: string
  street: string
  number: string
  neighborhood: string
  complement: string
  city: string
  uf: string
}

export const addressSchema = Joi.object().keys({
  zipcode: Joi.string().trim().min(5).required(),
  street: Joi.string().trim().required(),
  number: Joi.string().trim().required(),
  neighborhood: Joi.string().required(),
  complement: Joi.string(),
  city: Joi.string().trim().required(),
  uf: Joi.string().trim().length(2).uppercase().required(),
})
