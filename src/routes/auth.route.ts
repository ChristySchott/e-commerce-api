import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { AuthController } from '../controllers/auth.controller.js'
import { authLoginSchema } from '../models/user.model.js'

export const authRoutes = Router()

authRoutes.post(
  '/auth/login',
  celebrate({ [Segments.BODY]: authLoginSchema }),
  asyncHandler(AuthController.login),
)
