import { Joi } from 'celebrate'

export interface User {
  id: string
  name: string
  email: string
}

export const userSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
})
