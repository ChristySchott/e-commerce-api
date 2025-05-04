import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { ProductsController } from '../controllers/products.controller.js'
import {
  newProductSchema,
  Product,
  ProductQueryParams,
  searchProductSchema,
  updateProductSchema,
} from '../models/product.model.js'

export const productsRoutes = Router()

productsRoutes.get(
  '/products',
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Retrieve all products'
    #swagger.description = 'Fetches all registered products.'
    #swagger.responses[200] = {
      description: 'List of products',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Product' }
          }
        }
      }
    }
  */
  asyncHandler(ProductsController.getAll),
)

productsRoutes.get(
  '/products/search',
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Search products by category'
    #swagger.description = 'Search products filtered by category ID.'
    #swagger.parameters['categoryId'] = {
      in: 'query',
      description: 'Category ID to filter products',
      required: true,
      schema: {
        type: 'string'
      }
    }
    #swagger.responses[200] = {
      description: 'Filtered list of products',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Product' }
          }
        }
      }
    }
  */
  celebrate({
    [Segments.QUERY]: searchProductSchema,
  }),
  asyncHandler<null, Product[], null, ProductQueryParams>(ProductsController.search),
)

productsRoutes.get(
  '/products/:id',
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Retrieve a product by ID'
    #swagger.description = 'Fetch a specific product using its ID.'
    #swagger.parameters['id'] = { description: 'Product ID' }
    #swagger.responses[200] = {
      description: 'Product data',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/Product' }
        }
      }
    }
  */
  asyncHandler(ProductsController.getById),
)

productsRoutes.post(
  '/products',
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Create a new product'
    #swagger.description = 'Register a new product.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/addProduct" }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Product created successfully'
    }
  */
  celebrate({
    [Segments.BODY]: newProductSchema,
  }),
  asyncHandler(ProductsController.save),
)

productsRoutes.put(
  '/products/:id',
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Update a product'
    #swagger.description = 'Update a specific product using its ID.'
    #swagger.parameters['id'] = { description: 'Product ID' }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/updateProduct" }
        }
      }
    }
    #swagger.responses[204] = {
      description: 'Product updated successfully'
    }
  */
  celebrate({
    [Segments.BODY]: updateProductSchema,
  }),
  asyncHandler(ProductsController.update),
)

productsRoutes.delete(
  '/products/:id',
  /*
    #swagger.tags = ['Products']
    #swagger.summary = 'Delete a product'
    #swagger.description = 'Delete a product by its ID.'
    #swagger.parameters['id'] = { description: 'Product ID' }
    #swagger.responses[204] = {
      description: 'Product deleted successfully'
    }
  */
  asyncHandler(ProductsController.delete),
)
