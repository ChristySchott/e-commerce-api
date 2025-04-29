import { ErrorBase } from './base.error.js'

export class UnauthorizedError extends ErrorBase {
  constructor(message = 'Authetication required') {
    super(401, message)
  }
}
