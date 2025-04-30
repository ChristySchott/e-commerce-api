import {
  FirebaseAuthError,
  getAuth as getAdminAuth,
  UpdateRequest,
  UserRecord,
} from 'firebase-admin/auth'
import {
  signInWithEmailAndPassword,
  getAuth as getFirebaseAuth,
  UserCredential,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { User } from '../models/user.model.js'
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error.js'
import { UnauthorizedError } from '../errors/unauthorized.error.js'

export class AuthService {
  async create(user: User): Promise<UserRecord> {
    return await getAdminAuth()
      .createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
      })
      .catch((err) => {
        if (err instanceof FirebaseAuthError && err.code === 'auth/email-already-exists') {
          throw new EmailAlreadyExistsError()
        }
        throw err
      })
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(getFirebaseAuth(), email, password).catch((err) => {
      if (err instanceof FirebaseError && err.code === 'auth/invalid-credential') {
        throw new UnauthorizedError()
      }
      throw err
    })
  }

  async update(id: string, user: User): Promise<void> {
    const props: UpdateRequest = {
      displayName: user.name,
      email: user.email,
    }

    if (user.password) {
      props.password = user.password
    }

    await getAdminAuth().updateUser(id, props)
  }

  async delete(id: string): Promise<void> {
    await getAdminAuth().deleteUser(id)
  }

  async recovery(email: string): Promise<void> {
    await sendPasswordResetEmail(getFirebaseAuth(), email)
  }
}
