import { Request, Response } from 'express'
import { getFirestore } from 'firebase-admin/firestore'

interface User {
  id: number | string
  name: string
  email: string
}

export class UserController {
  static async getAll(req: Request, res: Response) {
    const snapshot = await getFirestore().collection('users').get()

    if (snapshot.empty) {
      res.send([])
    }

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
      res.status(404).end()
    }

    const user = { id: doc.id, ...doc.data() } as User
    res.send(user)
  }

  static async save(req: Request<Omit<User, 'id'>>, res: Response) {
    const user = req.body

    try {
      await getFirestore().collection('users').add(user)
      res.status(201).end()
    } catch {
      res.status(500).end()
    }
  }

  static async update(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = req.params.id
    const user = req.body as User

    const userRef = getFirestore().collection('users').doc(userId)
    const doc = await userRef.get()

    if (!doc.exists) {
      res.send({ status: 404, message: 'Usuário não encontrado' })
    }

    try {
      await userRef.update({ name: user.name, email: user.email })
      res.status(204).end()
    } catch {
      res.status(500).end()
    }
  }

  static async delete(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = req.params.id

    try {
      await getFirestore().collection('users').doc(userId).delete()
      res.status(204).end()
    } catch {
      res.status(500).end()
    }
  }
}
