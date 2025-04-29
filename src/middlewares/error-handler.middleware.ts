import { Express, NextFunction, Request, Response } from 'express'
import { errors } from 'celebrate'

import { InternalServerError } from '../errors/internal-server.error.js'
import { ErrorBase } from '../errors/base.error.js'

export const errorHandler = (app: Express) => {
  app.use(errors())
  app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ErrorBase) {
      return error.send(res)
    }

    return new InternalServerError().send(res)
  })
}
