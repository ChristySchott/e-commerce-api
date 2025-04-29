import { getFirestore } from 'firebase-admin/firestore'

import { User } from '../models/user.model.js'
import { NotFoundError } from '../errors/not-found.error.js'

export class UserService {
  async getAll(): Promise<User[]> {
    const snapshot = await getFirestore().collection('users').get()

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[]

    return users
  }

  async getById(id: string): Promise<User> {
    const doc = await getFirestore().collection('users').doc(id).get()

    if (!doc.exists) {
      throw new NotFoundError('User not found')
    }

    const user = { id: doc.id, ...doc.data() } as User

    return user
  }

  async create(user: User): Promise<void> {
    await getFirestore().collection('users').add(user)
  }

  async update(id: string, user: User): Promise<void> {
    const docRef = getFirestore().collection('users').doc(id)

    if (!(await docRef.get()).exists) {
      throw new NotFoundError('User not found')
    }

    await docRef.update({ name: user.name, email: user.email })
  }

  async delete(id: string): Promise<void> {
    const docRef = getFirestore().collection('users').doc(id)

    if (!(await docRef.get()).exists) {
      throw new NotFoundError('User not found')
    }

    await docRef.delete()
  }
}
