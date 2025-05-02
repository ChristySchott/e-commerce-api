import { Request } from 'express'

export const unauthenticatedRoutes: string[] = ['/auth/login', '/auth/recovery', '/auth/sigin']

export const isRouteUnauthenticated = (req: Request): boolean => {
  return req.method === 'POST' && unauthenticatedRoutes.some((route) => req.url.startsWith(route))
}

export const anonymousGetRoutes = ['/companies', '/products', '/categories', '/payment-methods']

export const anonymousPostRoutes = ['/orders']
