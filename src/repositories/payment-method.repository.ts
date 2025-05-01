import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { PaymentMethod } from '../models/payment-method.model.js'

export class PaymentMethodRepository {
  private collection: CollectionReference

  constructor() {
    this.collection = getFirestore().collection('payment-methods')
  }

  async getAll(): Promise<PaymentMethod[]> {
    const snapshot = await this.collection.get()

    const paymentMethods = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PaymentMethod[]

    return paymentMethods
  }

  async getById(id: string): Promise<PaymentMethod | null> {
    const doc = await this.collection.doc(id).get()

    if (!doc.exists) {
      return null
    }

    const paymentMethod = { id: doc.id, ...doc.data() } as PaymentMethod

    return paymentMethod
  }

  async save(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<void> {
    await this.collection.add(paymentMethod)
  }

  async update(paymentMethod: PaymentMethod): Promise<void> {
    await this.collection.doc(paymentMethod.id).set(paymentMethod)
  }

  async delete(id: string): Promise<void> {
    this.collection.doc(id).delete()
  }
}
