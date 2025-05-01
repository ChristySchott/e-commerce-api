import { Company } from '../models/company.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import { CompanyRepository } from '../repositories/company.repository.js'
import { UploadFileService } from './upload-file.service.js'
import { ValidationError } from '../errors/validation.error.js'

export class CompanyService {
  private companyRepository: CompanyRepository
  private uploadFileService: UploadFileService

  constructor() {
    this.companyRepository = new CompanyRepository()
    this.uploadFileService = new UploadFileService('images/companies/')
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
    const logoUrl = await this.uploadFileService.upload(company.logo)
    company.logo = logoUrl

    await this.companyRepository.save(company)
  }

  async update(id: string, company: Company): Promise<void> {
    const _company = await this.getById(id)

    if (!this.isValidUrl(company.logo)) {
      company.logo = await this.uploadFileService.upload(company.logo)
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

  private isValidUrl(urlString: string): boolean {
    try {
      const url = new URL(urlString)

      if (url.host !== 'firebasestorage.googleapis.com') {
        throw new ValidationError('Invalid URL origin')
      }

      return true
    } catch (err) {
      if (err instanceof ValidationError) {
        throw err
      }

      return false
    }
  }
}
