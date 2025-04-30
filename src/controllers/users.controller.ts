import { Request, Response } from 'express'

import { User } from '../models/user.model.js'
import { UserService } from '../services/user.service.js'

export class UsersController {
  static async getAll(req: Request, res: Response) {
    res.send(await new UserService().getAll())
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    const userId = req.params.id

    res.send(await new UserService().getById(userId))
  }

  static async save(req: Request<Omit<User, 'id'>>, res: Response) {
    const user = req.body

    await new UserService().save(user)
    res.status(201).end()
  }

  static async update(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = req.params.id
    const user = req.body as User

    await new UserService().update(userId, user)
    res.status(204).end()
  }

  static async delete(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = req.params.id

    await new UserService().delete(userId)
    res.status(204).end()
  }
}
