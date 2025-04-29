import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { AuthController } from '../controllers/auth.controller.js'

export const authRoutes = Router()

authRoutes.post('/auth/login', asyncHandler(AuthController.login))
