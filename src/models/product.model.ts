import { Joi } from 'celebrate'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'

import { Category } from './category.model.js'

export class Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: Category
  isActive: boolean

  constructor(data: Product) {
    this.id = data.id
    this.name = data.name
    this.description = data.description ?? null
    this.price = data.price
    this.image = data.image ?? null
    this.category = new Category(data.category)
    this.isActive = data.isActive ?? true
  }
}

export interface ProductQueryParams {
  categoryId: string
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

export const productConverter: FirestoreDataConverter<Product> = {
  toFirestore: (product: Product): DocumentData => ({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: {
      id: product.category.id,
      description: product.category.description,
      isActive: product.category.isActive,
    },
    isActive: product.isActive,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): Product => {
    return new Product({
      id: snapshot.id,
      ...(snapshot.data() as Omit<Product, 'id'>),
    })
  },
}
