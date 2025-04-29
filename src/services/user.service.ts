import { User } from '../models/user.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UserRepository } from '../repositories/user.repository.js'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll()
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(user)
  }

  async update(id: string, user: User): Promise<void> {
    const _user = await this.userRepository.getById(id)

    if (!_user) {
      throw new NotFoundError('User not found')
    }

    _user.name = user.name
    _user.email = user.email

    await this.userRepository.update(_user)
  }

  async delete(id: string): Promise<void> {
    const _user = await this.userRepository.getById(id)

    if (!_user) {
      throw new NotFoundError('User not found')
    }

    await this.userRepository.delete(id)
  }
}
