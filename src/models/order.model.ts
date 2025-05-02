import { Joi } from 'celebrate'

import { Company } from './company.model.js'
import { Customer, customerSchema } from './customer.model.js'
import { Address, addressSchema } from './address.model.js'
import { PaymentMethod } from './payment-method.model.js'
import { OrderItem, orderItemSchema } from './order-item.model.js'

export interface Order {
  id: string
  company: Company
  customer: Customer
  address: Address
  taxpayerId: string
  date: Date
  isDelivery: boolean
  deliveryFee: number
  paymentMethod: PaymentMethod
  items: OrderItem[]
  status: OrderStatus
  notes: string
}

export enum OrderStatus {
  pending = 'pending',
  approved = 'approved',
  delivering = 'delivering',
  completed = 'completed',
  cancelled = 'cancelled',
}

export interface OrderQueryParams {
  companyId?: string
  startDate?: Date
  endDate?: Date
  status?: OrderStatus
}

export const newOrderSchema = Joi.object().keys({
  company: Joi.object()
    .keys({
      id: Joi.string().trim().required(),
    })
    .required(),
  customer: customerSchema.required(),
  address: Joi.alternatives().conditional('isDelivery', {
    is: true,
    then: addressSchema.required(),
    otherwise: Joi.object().only().allow(null).default(null),
  }),
  taxpayerId: Joi.alternatives()
    .try(Joi.string().length(11).required(), Joi.string().length(14).required(), Joi.valid(null))
    .default(null),
  isDelivery: Joi.boolean().required(),
  deliveryFee: Joi.number().min(0).required(),
  paymentMethod: Joi.object()
    .keys({
      id: Joi.string().trim().required(),
    })
    .required(),
  items: Joi.array().min(1).items(orderItemSchema).required(),
  status: Joi.string().only().allow(OrderStatus.pending).default(OrderStatus.pending),
  notes: Joi.string().trim().allow(null).default(null),
})

export const searchOrderSchema = Joi.object().keys({
  companyId: Joi.string().trim(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  status: Joi.string()
    .only()
    .allow(...Object.values(OrderStatus)),
})
