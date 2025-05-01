import { Request, Response } from 'express'

import { Product } from '../models/product.model.js'
import { ProductService } from '../services/product.service.js'

export class ProductsController {
  static async getAll(req: Request, res: Response) {
    res.send(await new ProductService().getAll())
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    const productId = req.params.id

    res.send(await new ProductService().getById(productId))
  }

  static async save(req: Request<{ id: string }, null, Omit<Product, 'id'>>, res: Response) {
    const product = req.body

    await new ProductService().save(product)
    res.status(201).end()
  }

  static async update(req: Request<{ id: string }, null, Omit<Product, 'id'>>, res: Response) {
    const productId = req.params.id
    const product = req.body as Product

    await new ProductService().update(productId, product)
    res.status(204).end()
  }

  static async delete(req: Request<{ id: string }, null, Omit<Product, 'id'>>, res: Response) {
    const productId = req.params.id

    await new ProductService().delete(productId)
    res.status(204).end()
  }
}
