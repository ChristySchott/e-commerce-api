import dayjs from 'dayjs'
import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { Order, OrderQueryParams } from '../models/order.model.js'

export class OrderRepository {
  private collection: CollectionReference

  constructor() {
    this.collection = getFirestore().collection('orders')
  }

  async search(queryParams: OrderQueryParams): Promise<Order[]> {
    let query: FirebaseFirestore.Query = this.collection

    if (queryParams.companyId) {
      query = query.where('company.id', '==', queryParams.companyId)
    }

    if (queryParams.status) {
      query = query.where('status', '==', queryParams.status)
    }

    if (queryParams.startDate) {
      queryParams.startDate = dayjs(queryParams.startDate).add(1, 'day').startOf('day').toDate()
      query = query.where('date', '>=', queryParams.startDate)
    }

    if (queryParams.endDate) {
      queryParams.endDate = dayjs(queryParams.endDate).add(1, 'day').endOf('day').toDate()
      query = query.where('date', '<=', queryParams.endDate)
    }

    const snapshot = await query.get()

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
