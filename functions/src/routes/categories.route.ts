import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { CategoriesController } from '../controllers/categories.controller.js'
import { newCategorySchema, updateCategorySchema } from '../models/category.model.js'

export const categoriesRoutes = Router()

categoriesRoutes.get(
  '/categories',
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
    #swagger.description = 'Retrieve a list of all product categories.'
    #swagger.responses[200] = {
      description: 'List of categories',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Category' }
          }
        }
      }
    }
  */
  asyncHandler(CategoriesController.getAll),
)

categoriesRoutes.get(
  '/categories/:id',
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get category by ID'
    #swagger.description = 'Retrieve a single category by its ID.'
    #swagger.parameters['id'] = { description: 'Category ID' }
    #swagger.responses[200] = {
      description: 'Category details',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/Category' }
        }
      }
    }
  */
  asyncHandler(CategoriesController.getById),
)

categoriesRoutes.post(
  '/categories',
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Create a new category'
    #swagger.description = 'Add a new product category.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/addCategory" }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Category created successfully'
    }
  */
  celebrate({ [Segments.BODY]: newCategorySchema }),
  asyncHandler(CategoriesController.save),
)

categoriesRoutes.put(
  '/categories/:id',
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Update a category'
    #swagger.description = 'Update an existing category by ID.'
    #swagger.parameters['id'] = { description: 'Category ID' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/updateCategory" }
        }
      }
    }
    #swagger.responses[204] = {
      description: 'Category updated successfully'
    }
  */
  celebrate({ [Segments.BODY]: updateCategorySchema }),
  asyncHandler(CategoriesController.update),
)

categoriesRoutes.delete(
  '/categories/:id',
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Delete a category'
    #swagger.description = 'Delete a category by ID.<br><br><b>Note:</b> <i>This action is irreversible.</i>'
    #swagger.parameters['id'] = { description: 'Category ID' }
    #swagger.responses[204] = {
      description: 'Category deleted successfully'
    }
  */
  asyncHandler(CategoriesController.delete),
)
