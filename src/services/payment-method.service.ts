import { PaymentMethod } from '../models/payment-method.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { PaymentMethodRepository } from '../repositories/payment-method.repository.js'

export class PaymentMethodService {
  private paymentMethodRepository: PaymentMethodRepository

  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepository()
  }

  async getAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.getAll()
  }

  async getById(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.getById(id)

    if (!paymentMethod) {
      throw new NotFoundError('Payment method not found')
    }

    return paymentMethod
  }

  async save(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<void> {
    await this.paymentMethodRepository.save(paymentMethod)
  }

  async update(id: string, paymentMethod: PaymentMethod): Promise<void> {
    const _paymentMethod = await this.getById(id)

    _paymentMethod.description = paymentMethod.description
    _paymentMethod.isActive = paymentMethod.isActive

    await this.paymentMethodRepository.update(_paymentMethod)
  }

  async delete(id: string): Promise<void> {
    await this.getById(id)

    await this.paymentMethodRepository.delete(id)
  }
}
