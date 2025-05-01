import { ValidationError } from '../errors/validation.error.js'

export const isStorageUrlValid = (urlString: string): boolean => {
  try {
    const url = new URL(urlString)

    if (url.host !== 'firebasestorage.googleapis.com') {
      throw new ValidationError('Invalid URL origin')
    }

    return true
  } catch (err) {
    if (err instanceof ValidationError) {
      throw err
    }

    return false
  }
}
