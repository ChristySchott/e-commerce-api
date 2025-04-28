import { Request, Response } from 'express'

interface User {
  id: number
  name: string
  email: string
}

let id = 0
const users: User[] = []

export class UserController {
  static getAll(req: Request<{ id: string }>, res: Response) {
    res.send(users)
  }

  static getById(req: Request<{ id: string }>, res: Response) {
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)

    res.send(user ?? { status: 404, message: 'Usuário não encontrado' })
  }

  static save(req: Request<Omit<User, 'id'>>, res: Response) {
    const user = req.body

    users.push({ ...user, id: ++id })

    res.send({ status: 201, message: 'Usuário criado com sucesso!' })
  }

  static update(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = Number(req.params.id)
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex === -1) {
      res.status(404).send({ message: 'Usuário não encontrado!' })
      return
    }

    const updatedUser = { ...users[userIndex], ...req.body }
    users[userIndex] = updatedUser

    res.send({ message: 'Usuário atualizado com sucesso!', user: updatedUser })
  }

  static delete(req: Request<{ id: string }, null, Omit<User, 'id'>>, res: Response) {
    const userId = Number(req.params.id)
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex === -1) {
      res.status(404).send({ message: 'Usuário não encontrado!' })
      return
    }

    users.splice(userIndex, 1)
    res.send({ message: 'Usuário removido com sucesso!', users: users })
  }
}
