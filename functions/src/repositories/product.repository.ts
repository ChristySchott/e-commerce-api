import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { Product, productConverter } from '../models/product.model.js'

export class ProductRepository {
  private collection: CollectionReference<Product>

  constructor() {
    this.collection = getFirestore().collection('products').withConverter(productConverter)
  }

  async getAll(): Promise<Product[]> {
    const snapshot = await this.collection.get()
    return snapshot.docs.map((doc) => doc.data())
  }

  async search(categoryId: string): Promise<Product[]> {
    const snapshot = await this.collection.where('category.id', '==', categoryId).get()

    return snapshot.docs.map((doc) => doc.data())
  }

  async getById(id: string): Promise<Product | null> {
    const doc = await this.collection.doc(id).get()
    return doc.data() ?? null
  }

  async save(product: Product): Promise<void> {
    await this.collection.add(product)
  }

  async update(product: Product): Promise<void> {
    await this.collection.doc(product.id).set(product)
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete()
  }

  async getCountByCategory(categoryId: string): Promise<number> {
    const countSnapshot = await this.collection.where('category.id', '==', categoryId).count().get()

    return countSnapshot.data().count
  }
}
