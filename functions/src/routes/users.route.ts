import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { UsersController } from '../controllers/users.controller.js'
import { newUserSchema, updateUserSchema } from '../models/user.model.js'

export const usersRoutes = Router()

usersRoutes.get(
  '/users',
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Retrieve all users'
    #swagger.description = 'Fetches all users registered in the system.'
  */
  asyncHandler(UsersController.getAll),
)

usersRoutes.get(
  '/users/:id',
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Retrieve a user by ID'
    #swagger.description = 'Fetches a specific user using the user ID.'
    #swagger.parameters['id'] = {
      description: 'User ID',
      required: true,
      type: 'string'
    }
  */
  asyncHandler(UsersController.getById),
)

usersRoutes.post(
  '/users',
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Create a new user'
    #swagger.description = 'Registers a new user in the system.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/addUser" }
        }
      }
    }
  */
  celebrate({
    [Segments.BODY]: newUserSchema,
  }),
  asyncHandler(UsersController.save),
)

usersRoutes.put(
  '/users/:id',
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Update user information'
    #swagger.description = 'Updates information for a specific user.'
    #swagger.parameters['id'] = {
      description: 'User ID',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/updateUser" }
        }
      }
    }
  */
  celebrate({
    [Segments.BODY]: updateUserSchema,
  }),
  asyncHandler(UsersController.update),
)

usersRoutes.delete(
  '/users/:id',
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user'
    #swagger.description = 'Deletes a user by ID. This action is irreversible.'
    #swagger.parameters['id'] = {
      description: 'User ID',
      required: true,
      type: 'string'
    }
  */
  asyncHandler(UsersController.delete),
)
