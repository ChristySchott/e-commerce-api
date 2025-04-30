import { CollectionReference, getFirestore } from 'firebase-admin/firestore'

import { Company } from '../models/company.model.js'

export class CompanyRepository {
  private collection: CollectionReference

  constructor() {
    this.collection = getFirestore().collection('companies')
  }

  async getAll(): Promise<Company[]> {
    const snapshot = await this.collection.get()

    const companies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Company[]

    return companies
  }

  async getById(id: string): Promise<Company | null> {
    const doc = await this.collection.doc(id).get()

    if (!doc.exists) {
      return null
    }

    const company = { id: doc.id, ...doc.data() } as Company

    return company
  }

  async save(company: Omit<Company, 'id'>): Promise<void> {
    await this.collection.add(company)
  }

  async update(company: Company): Promise<void> {
    await this.collection.doc(company.id).set(company)
  }
}
