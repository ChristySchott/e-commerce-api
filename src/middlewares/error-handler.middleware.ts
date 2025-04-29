import { Express, NextFunction, Request, Response } from 'express'
import { errors } from 'celebrate'

import { ValidationError } from '../errors/validation.error.js'
import { InternalServerError } from '../errors/internal-server.error.js'
import { NotFoundError } from '../errors/not-found.error.js'

export const errorHandler = (app: Express) => {
  app.use(errors())
  app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ValidationError) {
      return error.send(res)
    }

    if (error instanceof NotFoundError) {
      return error.send(res)
    }

    return new InternalServerError().send(res)
  })
}
