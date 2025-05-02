import { Order, OrderQueryParams } from '../models/order.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { OrderRepository } from '../repositories/order.repository.js'
import { CompanyRepository } from '../repositories/company.repository.js'
import { ProductRepository } from '../repositories/product.repository.js'
import { PaymentMethodRepository } from '../repositories/payment-method.repository.js'
import { OrderItem } from '../models/order-item.model.js'

export class OrderService {
  private orderRepository: OrderRepository
  private companyRepository: CompanyRepository
  private productRepository: ProductRepository
  private paymentMethodRepository: PaymentMethodRepository

  constructor() {
    this.orderRepository = new OrderRepository()
    this.companyRepository = new CompanyRepository()
    this.paymentMethodRepository = new PaymentMethodRepository()
    this.productRepository = new ProductRepository()
  }

  async search(query: OrderQueryParams): Promise<Order[]> {
    return this.orderRepository.search(query)
  }

  async getById(id: string): Promise<Order> {
    const order = await this.orderRepository.getById(id)

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    return order
  }

  async getItemsByOrderId(id: string): Promise<OrderItem[]> {
    await this.getById(id)

    const orderItems = await this.orderRepository.getItemsByOrderId(id)
    return orderItems
  }

  async save(order: Order): Promise<void> {
    const company = await this.companyRepository.getById(order.company.id)
    if (!company) {
      throw new NotFoundError('Company not found')
    }
    order.company = company

    const paymentMethod = await this.paymentMethodRepository.getById(order.paymentMethod.id)
    if (!paymentMethod) {
      throw new NotFoundError('Payment method not found')
    }
    order.paymentMethod = paymentMethod

    for (const item of order.items) {
      const product = await this.productRepository.getById(item.product.id)

      if (!product) {
        throw new NotFoundError('Product not found')
      }

      item.product = product
    }

    await this.orderRepository.save(order)
  }
}
