import { Joi } from 'celebrate'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'

import { Product } from './product.model.js'

export class OrderItem {
  id: string
  product: Product
  quantity: number
  note: string | null

  constructor(data: OrderItem) {
    this.id = data.id
    this.product = new Product(data.product)
    this.quantity = data.quantity
    this.note = data.note
  }
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

export const orderItemConverter: FirestoreDataConverter<OrderItem> = {
  toFirestore: (orderItem: OrderItem): DocumentData => ({
    product: {
      id: orderItem.product.id,
      name: orderItem.product.name,
      description: orderItem.product.description,
      price: orderItem.product.price,
      image: orderItem.product.image,
      category: {
        id: orderItem.product.category.id,
        description: orderItem.product.category.description,
      },
    },
    quantity: orderItem.quantity,
    note: orderItem.note,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): OrderItem => {
    return new OrderItem({
      id: snapshot.id,
      ...(snapshot.data() as Omit<OrderItem, 'id'>),
    })
  },
}
