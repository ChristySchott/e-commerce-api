import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { Product } from '../models/product.model.js'

export class ProductRepository {
  private collection: CollectionReference

  constructor() {
    this.collection = getFirestore().collection('products')
  }

  async getAll(): Promise<Product[]> {
    const snapshot = await this.collection.get()

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[]

    return products
  }

  async getById(id: string): Promise<Product | null> {
    const doc = await this.collection.doc(id).get()

    if (!doc.exists) {
      return null
    }

    const product = { id: doc.id, ...doc.data() } as Product

    return product
  }

  async save(product: Omit<Product, 'id'>): Promise<void> {
    await this.collection.add(product)
  }

  async update(product: Product): Promise<void> {
    await this.collection.doc(product.id).set(product)
  }

  async delete(id: string): Promise<void> {
    this.collection.doc(id).delete()
  }
}
