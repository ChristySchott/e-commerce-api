import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { CompaniesController } from '../controllers/companies.controller.js'
import { newCompanySchema, updateCompanySchema } from '../models/company.model.js'

export const companiesRoutes = Router()

companiesRoutes.get(
  '/companies',
  /*
    #swagger.tags = ['Companies']
    #swagger.summary = 'Get all companies'
    #swagger.description = 'Retrieve a list of all registered companies.'
    #swagger.responses[200] = {
      description: 'List of companies',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Company' }
          }
        }
      }
    }
  */
  asyncHandler(CompaniesController.getAll),
)

companiesRoutes.get(
  '/companies/:id',
  /*
    #swagger.tags = ['Companies']
    #swagger.summary = 'Get company by ID'
    #swagger.description = 'Retrieve a specific company using its ID.'
    #swagger.parameters['id'] = { description: 'Company ID' }
    #swagger.responses[200] = {
      description: 'Company details',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/Company' }
        }
      }
    }
  */
  asyncHandler(CompaniesController.getById),
)

companiesRoutes.post(
  '/companies',
  /*
    #swagger.tags = ['Companies']
    #swagger.summary = 'Create a new company'
    #swagger.description = 'Register a new company in the system.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/addCompany" }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Company created successfully'
    }
  */
  celebrate({ [Segments.BODY]: newCompanySchema }),
  asyncHandler(CompaniesController.save),
)

companiesRoutes.put(
  '/companies/:id',
  /*
    #swagger.tags = ['Companies']
    #swagger.summary = 'Update a company'
    #swagger.description = 'Update company data by its ID.'
    #swagger.parameters['id'] = { description: 'Company ID' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/updateCompany" }
        }
      }
    }
    #swagger.responses[204] = {
      description: 'Company updated successfully'
    }
  */
  celebrate({ [Segments.BODY]: updateCompanySchema }),
  asyncHandler(CompaniesController.update),
)
