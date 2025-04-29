import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { User } from '../models/user.model.js'

export class UserRepository {
  private collection: CollectionReference

  constructor() {
    this.collection = getFirestore().collection('users')
  }

  async getAll(): Promise<User[]> {
    const snapshot = await this.collection.get()

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[]

    return users
  }

  async getById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get()

    if (!doc.exists) {
      return null
    }

    const user = { id: doc.id, ...doc.data() } as User

    return user
  }

  async save(user: User): Promise<void> {
    delete user.password
    await this.collection.doc(user.id).set(user)
  }

  async update(user: User): Promise<void> {
    const docRef = this.collection.doc(user.id)

    await docRef.update({ name: user.name, email: user.email })
  }

  async delete(id: string): Promise<void> {
    const docRef = this.collection.doc(id)

    await docRef.delete()
  }
}
