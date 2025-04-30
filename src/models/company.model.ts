import { Joi } from 'celebrate'
import { validator } from 'cpf-cnpj-validator'

import { phoneRegexPattern } from '../utils/regex-utils.js'

export interface Company {
  id: string
  logo: string
  document: string
  corporateName: string
  tradeName: string
  phone: string
  businessHours: string
  address: string
  location: string
  deliveryFee: number
  isActive: boolean
}

const documentValidator = Joi.extend(validator)
const documentSchemaValidator = Joi.alternatives()
  .try(documentValidator.document().cpf(), documentValidator.document().cnpj())
  .required()
  .messages({
    'alternatives.match': 'Invalid document',
  })

export const newCompanySchema = Joi.object().keys({
  logo: Joi.string().base64().required(),
  document: documentSchemaValidator,
  corporateName: Joi.string().trim().required(),
  tradeName: Joi.string().trim().required(),
  phone: Joi.string().regex(phoneRegexPattern).required(),
  businessHours: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
  deliveryFee: Joi.number().required(),
  isActive: Joi.boolean().only().allow(true).default(true),
})

export const updateCompanySchema = Joi.object().keys({
  logo: Joi.alternatives()
    .try(Joi.string().base64().required(), Joi.string().uri().required())
    .required(),
  document: documentSchemaValidator,
  corporateName: Joi.string().trim().required(),
  tradeName: Joi.string().trim().required(),
  phone: Joi.string().regex(phoneRegexPattern).required(),
  businessHours: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
  deliveryFee: Joi.number().required(),
  isActive: Joi.boolean().required(),
})
