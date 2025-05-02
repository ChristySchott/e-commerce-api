import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { Order } from '../models/order.model.js'

export class OrderRepository {
  private collection: CollectionReference

  constructor() {
    this.collection = getFirestore().collection('orders')
  }

  async getAll(): Promise<Order[]> {
    const snapshot = await this.collection.get()

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[]

    return orders
  }

  async getById(id: string): Promise<Order | null> {
    const doc = await this.collection.doc(id).get()

    if (!doc.exists) {
      return null
    }

    const order = { id: doc.id, ...doc.data() } as Order

    return order
  }

  async save(order: Omit<Order, 'id'>): Promise<void> {
    await this.collection.add(order)
  }
}
