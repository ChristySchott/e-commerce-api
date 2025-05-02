import { Joi } from 'celebrate'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'

import { passwordRegexPattern } from '../utils/regex-utils.js'

export class User {
  id: string
  name: string
  email: string
  password?: string

  constructor(data: User) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.password = data.password
  }
}

const passwordSchema = Joi.string().min(6).max(32).regex(passwordRegexPattern)

export const newUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordSchema.required().messages({
    'string.pattern.base':
      'Password must include uppercase, lowercase, number and special character.',
  }),
})

export const updateUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordSchema.messages({
    'string.pattern.base':
      'Password must include uppercase, lowercase, number and special character.',
  }),
})

export const authLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: passwordSchema.required().messages({
    'string.pattern.base': 'Invalid password format.',
  }),
})

export const authRecoverySchema = Joi.object().keys({
  email: Joi.string().email().required(),
})

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User): DocumentData => ({
    name: user.name,
    email: user.email,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): User => {
    return new User({
      id: snapshot.id,
      ...(snapshot.data() as Omit<User, 'id'>),
    })
  },
}
