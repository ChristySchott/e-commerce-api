import { Company } from '../models/company.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { CompanyRepository } from '../repositories/company.repository.js'

export class CompanyService {
  private companyRepository: CompanyRepository

  constructor() {
    this.companyRepository = new CompanyRepository()
  }

  async getAll(): Promise<Company[]> {
    return this.companyRepository.getAll()
  }

  async getById(id: string): Promise<Company> {
    const company = await this.companyRepository.getById(id)

    if (!company) {
      throw new NotFoundError('Company not found')
    }

    return company
  }

  async save(company: Omit<Company, 'id'>): Promise<void> {
    await this.companyRepository.save(company)
  }

  async update(id: string, company: Company): Promise<void> {
    const _company = await this.companyRepository.getById(id)

    if (!_company) {
      throw new NotFoundError('Company not found')
    }

    _company.document = company.document
    _company.corporateName = company.corporateName
    _company.tradeName = company.tradeName
    _company.phone = company.phone
    _company.businessHours = company.businessHours
    _company.address = company.address
    _company.location = company.location
    _company.deliveryFee = company.deliveryFee
    _company.isActive = company.isActive

    await this.companyRepository.update(_company)
  }
}
