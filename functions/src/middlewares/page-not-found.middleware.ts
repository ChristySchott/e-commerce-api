import { Express, NextFunction, Request, Response } from 'express'

import { NotFoundError } from '../errors/not-found.error.js'

export const pageNotFoundError = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError('Page not found'))
  })
}
