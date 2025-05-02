import { Joi } from 'celebrate'
import { validator } from 'cpf-cnpj-validator'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'

import { phoneRegexPattern } from '../utils/regex-utils.js'

export class Company {
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

  constructor(data: Company) {
    this.id = data.id
    this.logo = data.logo
    this.document = data.document
    this.corporateName = data.corporateName
    this.tradeName = data.tradeName
    this.phone = data.phone
    this.businessHours = data.businessHours
    this.address = data.address
    this.location = data.location
    this.deliveryFee = data.deliveryFee
    this.isActive = data.isActive ?? true
  }
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

export const companyConverter: FirestoreDataConverter<Company> = {
  toFirestore: (company: Company): DocumentData => ({
    logo: company.logo,
    document: company.document,
    corporateName: company.corporateName,
    tradeName: company.tradeName,
    phone: company.phone,
    businessHours: company.businessHours,
    address: company.address,
    location: company.location,
    deliveryFee: company.deliveryFee,
    isActive: company.isActive,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): Company => {
    return new Company({
      id: snapshot.id,
      ...(snapshot.data() as Omit<Company, 'id'>),
    })
  },
}
