import { Injectable, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames

@Injectable()
export class FirebaseStorageService {
  private bucket = admin.storage().bucket("");

  /**
   * Uploads a file to Firebase Storage.
   * @param file - The file to upload, received from Multer.
   * @returns The public URL of the uploaded file.
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Validate the file
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('File buffer is empty');
    }

    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = this.bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype, // Set the correct MIME type
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        console.error('Error uploading file:', err.message);
        reject(new BadRequestException('Failed to upload file'));
      });

      stream.on('finish', async () => {
        try {
          // Make the file publicly accessible (optional)
          await fileUpload.makePublic();
          resolve(fileUpload.publicUrl());
        } catch (error) {
          console.error('Error making file public:', error.message);
          reject(new BadRequestException('Failed to make file public'));
        }
      });

      stream.end(file.buffer);
    });
  }

  /**
   * Gets the public URL of a file from Firebase Storage.
   * @param fileName - The name of the file.
   * @returns The public URL of the file.
   */
  async getFileUrl(fileName: string): Promise<string> {
    const file = this.bucket.file(fileName);
    const [exists] = await file.exists();

    if (!exists) {
      throw new BadRequestException('File not found');
    }

    return file.publicUrl();
  }

  /**
   * Deletes a file from Firebase Storage.
   * @param fileName - The name of the file.
   */
  async deleteFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);
    const [exists] = await file.exists();

    if (!exists) {
      throw new BadRequestException('File not found');
    }

    await file.delete();
  }
}
