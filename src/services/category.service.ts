import { Category } from '../models/category.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { CategoryRepository } from '../repositories/category.repository.js'

export class CategoryService {
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.getAll()
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.getById(id)

    if (!category) {
      throw new NotFoundError('Category not found')
    }

    return category
  }

  async save(category: Omit<Category, 'id'>): Promise<void> {
    await this.categoryRepository.save(category)
  }

  async update(id: string, category: Category): Promise<void> {
    const _category = await this.categoryRepository.getById(id)

    if (!_category) {
      throw new NotFoundError('Category not found')
    }

    _category.description = category.description
    _category.isActive = category.isActive

    await this.categoryRepository.update(_category)
  }

  async delete(id: string): Promise<void> {
    const _category = await this.categoryRepository.getById(id)

    if (!_category) {
      throw new NotFoundError('Category not found')
    }

    await this.categoryRepository.delete(id)
  }
}
