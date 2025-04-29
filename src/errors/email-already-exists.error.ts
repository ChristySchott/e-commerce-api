import { ErrorBase } from './base.error.js'

export class EmailAlreadyExistsError extends ErrorBase {
  constructor(message = 'The provided email is already in use by another account') {
    super(409, message)
  }
}
