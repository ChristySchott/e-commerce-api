import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { celebrate, Segments } from 'celebrate'

import { AuthController } from '../controllers/auth.controller.js'
import { authLoginSchema, authRecoverySchema } from '../models/user.model.js'

export const authRoutes = Router()

authRoutes.post(
  '/auth/login',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'User login'
    #swagger.description = 'Authenticate a user and retrieve a JWT token.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/login" }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Authentication successful',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              token: { type: 'string' }
            }
          }
        }
      }
    }
  */
  celebrate({ [Segments.BODY]: authLoginSchema }),
  asyncHandler(AuthController.login),
)

authRoutes.post(
  '/auth/recovery',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Password recovery'
    #swagger.description = 'Send a password recovery email to the user.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/recovery" }
        }
      }
    }
    #swagger.responses[204] = {
      description: 'Recovery email sent'
    }
  */
  celebrate({ [Segments.BODY]: authRecoverySchema }),
  asyncHandler(AuthController.recovery),
)

authRoutes.post(
  '/auth/sigin',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Sign in anonymously'
    #swagger.description = 'Generate an anonymous access token for testing or public access.'
    #swagger.responses[200] = {
      description: 'Anonymous authentication successful',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              token: { type: 'string' }
            }
          }
        }
      }
    }
  */
  asyncHandler(AuthController.sigin),
)
