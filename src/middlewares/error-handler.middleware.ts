import { Express, NextFunction, Request, Response } from 'express'

import { ValidationError } from '../errors/validation.error.js'
import { InternalServerError } from '../errors/internal-server.error.js'

export const errorHandler = (app: Express) => {
  app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ValidationError) {
      error.send(res)
    }

    new InternalServerError().send(res)
  })
}
