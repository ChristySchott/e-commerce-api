import { Joi } from 'celebrate'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'

export class Category {
  id: string
  description: string
  isActive: boolean

  constructor(data: Category) {
    this.id = data.id
    this.description = data.description
    this.isActive = data.isActive ?? true
  }
}

export const newCategorySchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().only().allow(true).default(true),
})

export const updateCategorySchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().required(),
})

export const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore: (category: Category): DocumentData => ({
    description: category.description,
    isActive: category.isActive,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): Category => {
    return new Category({
      id: snapshot.id,
      ...(snapshot.data() as Omit<Category, 'id'>),
    })
  },
}
