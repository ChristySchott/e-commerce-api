import { ErrorBase } from './base.error.js'

export class ForbiddenError extends ErrorBase {
  constructor(message = 'Access denied') {
    super(403, message)
  }
}
