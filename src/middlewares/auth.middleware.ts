import { Express, NextFunction, Request, Response } from 'express'
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'

import { ForbiddenError } from '../errors/forbidden.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'
import { UserService } from '../services/user.service.js'
import { isRouteUnauthenticated } from '../utils/auth-utils.js'

export const auth = (app: Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (isRouteUnauthenticated(req)) {
      return next()
    }

    const token = req.headers.authorization?.split('Bearer ')[1]

    if (token) {
      try {
        const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true)

        if (decodeIdToken.firebase.sign_in_provider === 'anonymous') {
          return next()
        }

        const user = await new UserService().getById(decodeIdToken.uid)

        if (!user) {
          return next(new ForbiddenError())
        }

        req.user = user

        return next()
      } catch {
        return next(new UnauthorizedError())
      }
    }

    next(new UnauthorizedError())
  })
}
