import { Request, Response } from 'express'

import { Order, OrderQueryParams } from '../models/order.model.js'
import { OrderService } from '../services/order.service.js'

export class OrdersController {
  static async search(req: Request<null, null, null, OrderQueryParams>, res: Response) {
    res.send(await new OrderService().search(req.query))
  }

  static async getItemsByOrderId(req: Request<{ id: string }>, res: Response) {
    const orderId = req.params.id

    res.send(await new OrderService().getItemsByOrderId(orderId))
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    const orderId = req.params.id

    res.send(await new OrderService().getById(orderId))
  }

  static async save(req: Request<{ id: string }, null, Order>, res: Response) {
    const order = new Order(req.body)

    await new OrderService().save(order)
    res.status(201).end()
  }

  static async updateStatus(
    req: Request<{ id: string }, null, Pick<Order, 'status'>>,
    res: Response,
  ) {
    const userId = req.params.id
    const orderStatus = req.body.status

    await new OrderService().updateStatus(userId, orderStatus)
    res.status(204).end()
  }
}
