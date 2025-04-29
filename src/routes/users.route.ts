import express from 'express'
import asyncHandler from 'express-async-handler'

import { UserController } from '../controllers/users.controller.js'

export const userRoutes = express.Router()

userRoutes.get('/users', asyncHandler(UserController.getAll))
userRoutes.get('/users/:id', asyncHandler(UserController.getById))
userRoutes.post('/users', asyncHandler(UserController.save))
userRoutes.put('/users/:id', asyncHandler(UserController.update))
userRoutes.delete('/users/:id', asyncHandler(UserController.delete))
