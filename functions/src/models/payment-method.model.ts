import { Joi } from 'celebrate'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'

export class PaymentMethod {
  id: string
  description: string
  isActive: boolean

  constructor(data: PaymentMethod) {
    this.id = data.id
    this.description = data.description
    this.isActive = data.isActive ?? true
  }
}

export const newPaymentMethodSchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().only().allow(true).default(true),
})

export const updatePaymentMethodSchema = Joi.object().keys({
  description: Joi.string().required(),
  isActive: Joi.boolean().required(),
})

export const paymentMethodConverter: FirestoreDataConverter<PaymentMethod> = {
  toFirestore: (paymentMethod: PaymentMethod): DocumentData => ({
    description: paymentMethod.description,
    isActive: paymentMethod.isActive,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): PaymentMethod => {
    return new PaymentMethod({
      id: snapshot.id,
      ...(snapshot.data() as Omit<PaymentMethod, 'id'>),
    })
  },
}
