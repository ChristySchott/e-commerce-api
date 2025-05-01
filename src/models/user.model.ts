import { Joi } from 'celebrate'

import { passwordRegexPattern } from '../utils/regex-utils.js'

export interface User {
  id: string
  name: string
  email: string
  password?: string
}

const passwordSchema = Joi.string().min(6).max(32).regex(passwordRegexPattern)

export const newUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordSchema.required().messages({
    'string.pattern.base':
      'Password must include uppercase, lowercase, number and special character.',
  }),
})

export const updateUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordSchema.messages({
    'string.pattern.base':
      'Password must include uppercase, lowercase, number and special character.',
  }),
})

export const authLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: passwordSchema.required().messages({
    'string.pattern.base': 'Invalid password format.',
  }),
})

export const authRecoverySchema = Joi.object().keys({
  email: Joi.string().email().required(),
})
