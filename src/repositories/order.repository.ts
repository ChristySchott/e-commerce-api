import dayjs from 'dayjs'
import { CollectionReference, getFirestore, Query } from 'firebase-admin/firestore'

import { Order, OrderQueryParams, OrderStatus, orderConverter } from '../models/order.model.js'
import { OrderItem, orderItemConverter } from '../models/order-item.model.js'

export class OrderRepository {
  private collection: CollectionReference<Order>

  constructor() {
    this.collection = getFirestore().collection('orders').withConverter(orderConverter)
  }

  async search(queryParams: OrderQueryParams): Promise<Order[]> {
    let query: Query<Order> = this.collection

    if (queryParams.companyId) {
      query = query.where('company.id', '==', queryParams.companyId)
    }

    if (queryParams.status) {
      query = query.where('status', '==', queryParams.status)
    }

    if (queryParams.startDate) {
      const startDate = dayjs(queryParams.startDate).add(1, 'day').startOf('day').toDate()
      query = query.where('date', '>=', startDate)
    }

    if (queryParams.endDate) {
      const endDate = dayjs(queryParams.endDate).add(1, 'day').endOf('day').toDate()
      query = query.where('date', '<=', endDate)
    }

    const snapshot = await query.get()
    return snapshot.docs.map((doc) => doc.data())
  }

  async getItemsByOrderId(id: string): Promise<OrderItem[]> {
    const itemsRef = this.collection.doc(id).collection('items').withConverter(orderItemConverter)
    const snapshot = await itemsRef.get()
    return snapshot.docs.map((doc) => doc.data())
  }

  async getById(id: string): Promise<Order | null> {
    const doc = await this.collection.doc(id).get()
    return doc.data() ?? null
  }

  async save(order: Order): Promise<void> {
    const batch = getFirestore().batch()

    const orderRef = this.collection.doc()
    batch.create(orderRef, order)

    const itemsRef = orderRef.collection('items').withConverter(orderItemConverter)
    for (const item of order.items) {
      batch.create(itemsRef.doc(), item)
    }

    await batch.commit()
  }

  async updateStatus(id: string, status: OrderStatus) {
    await this.collection.withConverter(null).doc(id).set(
      {
        status: status,
      },
      {
        merge: true,
      },
    )
  }
}
