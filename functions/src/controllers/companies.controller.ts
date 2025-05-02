import { Request, Response } from 'express'

import { Company } from '../models/company.model.js'
import { CompanyService } from '../services/company.service.js'

export class CompaniesController {
  static async getAll(req: Request, res: Response<Company[]>) {
    res.send(await new CompanyService().getAll())
  }

  static async getById(req: Request<{ id: string }>, res: Response<Company>) {
    const companyId = req.params.id

    res.send(await new CompanyService().getById(companyId))
  }

  static async save(req: Request<{ id: string }, null, Company>, res: Response) {
    const company = req.body

    await new CompanyService().save(company)
    res.status(201).end()
  }

  static async update(req: Request<{ id: string }, null, Omit<Company, 'id'>>, res: Response) {
    const companyId = req.params.id
    const company = req.body as Company

    await new CompanyService().update(companyId, company)
    res.status(204).end()
  }
}
