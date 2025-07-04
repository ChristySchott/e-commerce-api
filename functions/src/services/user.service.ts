import { User } from '../models/user.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { UserRepository } from '../repositories/user.repository.js'
import { AuthService } from './auth.service.js'

export class UserService {
  private userRepository: UserRepository
  private authService: AuthService

  constructor() {
    this.userRepository = new UserRepository()
    this.authService = new AuthService()
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
    const userAuth = await this.authService.create(user)
    user.id = userAuth.uid

    await this.userRepository.save(user)
  }

  async update(id: string, user: User): Promise<void> {
    const _user = await this.getById(id)

    _user.name = user.name
    _user.email = user.email

    await this.authService.update(id, user)
    await this.userRepository.update(_user)
  }

  async delete(id: string): Promise<void> {
    await this.getById(id)

    await this.authService.delete(id)
    await this.userRepository.delete(id)
  }
}
