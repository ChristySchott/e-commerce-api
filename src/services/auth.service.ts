import { FirebaseAuthError, getAuth, UserRecord } from 'firebase-admin/auth'

import { User } from '../models/user.model.js'
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error.js'

export class AuthService {
  async create(user: User): Promise<UserRecord> {
    try {
      return await getAuth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
      })
    } catch (err) {
      if (err instanceof FirebaseAuthError && err.code === 'auth/email-already-exists') {
        throw new EmailAlreadyExistsError()
      }
      throw err
    }
  }
}
