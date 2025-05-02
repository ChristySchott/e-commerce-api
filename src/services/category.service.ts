import { Category } from '../models/category.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { CategoryRepository } from '../repositories/category.repository.js'
import { ProductRepository } from '../repositories/product.repository.js'
import { ValidationError } from '../errors/validation.error.js'

export class CategoryService {
  private categoryRepository: CategoryRepository
  private productRepository: ProductRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
    this.productRepository = new ProductRepository()
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

  async save(category: Category): Promise<void> {
    await this.categoryRepository.save(category)
  }

  async update(id: string, category: Category): Promise<void> {
    const _category = await this.getById(id)

    _category.description = category.description
    _category.isActive = category.isActive

    await this.categoryRepository.update(_category)
  }

  async delete(id: string): Promise<void> {
    await this.getById(id)

    if ((await this.productRepository.getCountByCategory(id)) > 0) {
      throw new ValidationError(
        'This category cannot be deleted because it is linked to one or more products',
      )
    }

    await this.categoryRepository.delete(id)
  }
}
