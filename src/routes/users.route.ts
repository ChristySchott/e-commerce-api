import express from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { UserController } from '../controllers/users.controller.js'
import { userSchema } from '../models/user.model.js'

export const userRoutes = express.Router()

userRoutes.get('/users', asyncHandler(UserController.getAll))
userRoutes.get('/users/:id', asyncHandler(UserController.getById))
userRoutes.post(
  '/users',
  celebrate({
    [Segments.BODY]: userSchema,
  }),
  asyncHandler(UserController.save),
)
userRoutes.put(
  '/users/:id',
  celebrate({
    [Segments.BODY]: userSchema,
  }),
  asyncHandler(UserController.update),
)
userRoutes.delete('/users/:id', asyncHandler(UserController.delete))
