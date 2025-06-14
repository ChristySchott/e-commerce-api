import { Request, Response } from 'express'

import { Category } from '../models/category.model.js'
import { CategoryService } from '../services/category.service.js'

export class CategoriesController {
  static async getAll(req: Request, res: Response<Category[]>) {
    res.send(await new CategoryService().getAll())
  }

  static async getById(req: Request<{ id: string }>, res: Response<Category>) {
    const categoryId = req.params.id

    res.send(await new CategoryService().getById(categoryId))
  }

  static async save(req: Request<{ id: string }, null, Category>, res: Response) {
    const category = req.body

    await new CategoryService().save(category)
    res.status(201).end()
  }

  static async update(req: Request<{ id: string }, null, Omit<Category, 'id'>>, res: Response) {
    const categoryId = req.params.id
    const category = req.body as Category

    await new CategoryService().update(categoryId, category)
    res.status(204).end()
  }

  static async delete(req: Request<{ id: string }>, res: Response) {
    const categoryId = req.params.id

    await new CategoryService().delete(categoryId)
    res.status(204).end()
  }
}
