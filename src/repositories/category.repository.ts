import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { Category } from '../models/category.model.js'

export class CategoryRepository {
  private collection: CollectionReference

  constructor() {
    this.collection = getFirestore().collection('categories')
  }

  async getAll(): Promise<Category[]> {
    const snapshot = await this.collection.get()

    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[]

    return categories
  }

  async getById(id: string): Promise<Category | null> {
    const doc = await this.collection.doc(id).get()

    if (!doc.exists) {
      return null
    }

    const category = { id: doc.id, ...doc.data() } as Category

    return category
  }

  async save(category: Omit<Category, 'id'>): Promise<void> {
    await this.collection.add(category)
  }

  async update(category: Category): Promise<void> {
    await this.collection.doc(category.id).set(category)
  }

  async delete(id: string): Promise<void> {
    this.collection.doc(id).delete()
  }
}
