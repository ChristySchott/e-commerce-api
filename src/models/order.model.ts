import { Joi } from 'celebrate'
import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  FieldValue,
} from 'firebase-admin/firestore'

import { Company } from './company.model.js'
import { Customer, customerSchema } from './customer.model.js'
import { Address, addressSchema } from './address.model.js'
import { PaymentMethod } from './payment-method.model.js'
import { OrderItem, orderItemSchema } from './order-item.model.js'

export class Order {
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
  subtotal: number
  total: number

  constructor(data: Order) {
    this.id = data.id
    this.company = new Company(data.company)
    this.customer = data.customer
    this.address = data.address
    this.taxpayerId = data.taxpayerId
    this.date = data.date instanceof Timestamp ? data.date.toDate() : data.date
    this.isDelivery = data.isDelivery
    this.deliveryFee = data.deliveryFee
    this.paymentMethod = new PaymentMethod(data.paymentMethod)
    this.items = data.items?.map((item: OrderItem) => new OrderItem(item))
    this.status = data.status ?? OrderStatus.pending
    this.notes = data.notes
    this.subtotal = data.subtotal
    this.total = data.total
  }

  getSubtotal(): number {
    return this.items?.map((item) => item.getTotal()).reduce((total, next) => total + next, 0) ?? 0
  }

  getTotal(): number {
    return this.getSubtotal() + this.deliveryFee
  }
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

export const orderConverter: FirestoreDataConverter<Order> = {
  toFirestore: (order: Order): DocumentData => ({
    company: {
      id: order.company.id,
      logo: order.company.logo,
      document: order.company.document,
      corporateName: order.company.corporateName,
      tradeName: order.company.tradeName,
      phone: order.company.phone,
      address: order.company.address,
      location: order.company.location,
    },
    customer: { name: order.customer.name, phone: order.customer.phone },
    address: {
      zipcode: order.address.zipcode,
      street: order.address.street,
      number: order.address.number,
      complement: order.address.complement,
      city: order.address.city,
      neighborhood: order.address.neighborhood,
      uf: order.address.uf,
    },
    taxpayerId: order.taxpayerId,
    date: FieldValue.serverTimestamp(),
    isDelivery: order.isDelivery,
    deliveryFee: order.deliveryFee,
    paymentMethod: {
      id: order.paymentMethod.id,
      description: order.paymentMethod.description,
    },
    status: order.status,
    notes: order.notes,
    subtotal: order.getSubtotal(),
    total: order.getTotal(),
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): Order => {
    return new Order({
      id: snapshot.id,
      ...(snapshot.data() as Omit<Order, 'id'>),
    })
  },
}
