import { Request, Response } from 'express'
import { getFirestore } from 'firebase-admin/firestore'

import { NotFoundError } from '../errors/not-found.error.js'
import { User } from '../models/user.model.js'

export class UserController {
  static async getAll(req: Request, res: Response) {
    const snapshot = await getFirestore().collection('users').get()

    const users = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as User,
    )
    res.send(users)
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    const userId = req.params.id
    const doc = await getFirestore().collection('users').doc(userId).get()

    if (!doc.exists) {
      throw new NotFoundError('User not found')
    }

    const user = { id: doc.id, ...doc.data() } as User
    res.send(user)
  }

  static async save(req: Request<Omit<User, 'id'>>, res: Response) {
    const user = req.body

    await getFirestore().collection('users').add(user)
    res.status(201).end()
  }

  static async update(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = req.params.id
    const user = req.body as User

    const docRef = getFirestore().collection('users').doc(userId)

    if (!(await docRef.get()).exists) {
      throw new NotFoundError('User not found')
    }

    await docRef.update({ name: user.name, email: user.email })
    res.status(204).end()
  }

  static async delete(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = req.params.id

    const docRef = getFirestore().collection('users').doc(userId)

    if (!(await docRef.get()).exists) {
      throw new NotFoundError('User not found')
    }

    await docRef.delete()
    res.status(204).end()
  }
}
