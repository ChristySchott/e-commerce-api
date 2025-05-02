import { Request, Response } from 'express'

import { PaymentMethod } from '../models/payment-method.model.js'
import { PaymentMethodService } from '../services/payment-method.service.js'

export class PaymentMethodsController {
  static async getAll(req: Request, res: Response) {
    res.send(await new PaymentMethodService().getAll())
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    const paymentMethodId = req.params.id

    res.send(await new PaymentMethodService().getById(paymentMethodId))
  }

  static async save(req: Request<{ id: string }, null, PaymentMethod>, res: Response) {
    const paymentMethod = req.body

    await new PaymentMethodService().save(paymentMethod)
    res.status(201).end()
  }

  static async update(
    req: Request<{ id: string }, null, Omit<PaymentMethod, 'id'>>,
    res: Response,
  ) {
    const paymentMethodId = req.params.id
    const paymentMethod = req.body as PaymentMethod

    await new PaymentMethodService().update(paymentMethodId, paymentMethod)
    res.status(204).end()
  }

  static async delete(req: Request<{ id: string }>, res: Response) {
    const paymentMethodId = req.params.id

    await new PaymentMethodService().delete(paymentMethodId)
    res.status(204).end()
  }
}
