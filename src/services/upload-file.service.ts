import { unlinkSync, writeFileSync } from 'fs'
import { getStorage, getDownloadURL } from 'firebase-admin/storage'
import { fileTypeFromBuffer } from 'file-type'
import { randomUUID } from 'crypto'

import { ValidationError } from '../errors/validation.error.js'

export class UploadFileService {
  constructor(private path = 'string') {}

  async upload(base64: string): Promise<string> {
    const fileBuffer = Buffer.from(base64, 'base64')

    const fileType = await fileTypeFromBuffer(fileBuffer)

    if (!fileType || (fileType.mime !== 'image/jpeg' && fileType.mime !== 'image/png')) {
      throw new ValidationError('Invalid file extension')
    }

    const fileName = `${randomUUID().toString()}.${fileType?.ext}`
    writeFileSync(fileName, fileBuffer)

    const bucket = getStorage().bucket(process.env.FIRE_BUCKET_PATH)
    const uploadResponse = await bucket.upload(fileName, {
      destination: this.path + fileName,
    })

    unlinkSync(fileName)

    return getDownloadURL(uploadResponse[0])
  }
}
