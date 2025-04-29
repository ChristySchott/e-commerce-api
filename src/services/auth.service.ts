import { FirebaseAuthError, getAuth as getAdminAuth, UserRecord } from 'firebase-admin/auth'
import {
  signInWithEmailAndPassword,
  getAuth as getFirebaseAuth,
  UserCredential,
} from 'firebase/auth'

import { User } from '../models/user.model.js'
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error.js'

export class AuthService {
  async create(user: User): Promise<UserRecord> {
    try {
      return await getAdminAuth().createUser({
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

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(getFirebaseAuth(), email, password)
  }
}
