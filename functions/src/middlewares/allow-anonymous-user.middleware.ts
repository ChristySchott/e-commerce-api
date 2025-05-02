import { NextFunction, Request, Response } from 'express'

import { ForbiddenError } from '../errors/forbidden.error.js'
import { anonymousGetRoutes, anonymousPostRoutes } from '../utils/auth-utils.js'

export const allowAnonymousUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next()
  }

  if (req.method === 'GET') {
    const isAnonymousRoute = anonymousGetRoutes.includes(req.url) || req.url.startsWith('/orders/')
    if (isAnonymousRoute) {
      return next()
    }
  }

  if (req.method === 'POST' && anonymousPostRoutes.includes(req.url)) {
    return next()
  }

  return next(new ForbiddenError())
}
