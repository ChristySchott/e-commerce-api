import { Product } from '../models/product.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { ProductRepository } from '../repositories/product.repository.js'
import { UploadFileService } from './upload-file.service.js'
import { CategoryRepository } from '../repositories/category.repository.js'
import { Category } from '../models/category.model.js'
import { isStorageUrlValid } from '../utils/validation-utils.js'

export class ProductService {
  private productRepository: ProductRepository
  private categoryRepository: CategoryRepository
  private uploadFileService: UploadFileService

  constructor() {
    this.productRepository = new ProductRepository()
    this.categoryRepository = new CategoryRepository()
    this.uploadFileService = new UploadFileService('images/products/')
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll()
  }

  async search(categoryId: string): Promise<Product[]> {
    return this.productRepository.search(categoryId)
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.getById(id)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    return product
  }

  async save(product: Product): Promise<void> {
    const category = await this.getCategoryById(product.category.id)
    product.category = category

    if (product.image) {
      const imageUrl = await this.uploadFileService.upload(product.image)
      product.image = imageUrl
    }

    await this.productRepository.save(product)
  }

  async update(id: string, product: Product): Promise<void> {
    const _product = await this.getById(id)
    const category = await this.getCategoryById(product.category.id)

    if (product.image && !isStorageUrlValid(product.image)) {
      product.image = await this.uploadFileService.upload(product.image)
    }

    _product.category = category
    _product.name = product.name
    _product.price = product.price
    _product.image = product.image
    _product.description = product.description
    _product.isActive = product.isActive

    await this.productRepository.update(_product)
  }

  async delete(id: string): Promise<void> {
    await this.getById(id)

    await this.productRepository.delete(id)
  }

  private async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.getById(id)

    if (!category) {
      throw new NotFoundError('Category not found')
    }

    return category
  }
}
