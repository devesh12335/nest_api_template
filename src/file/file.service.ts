import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UploadedFile } from './entities/file.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as admin from "firebase-admin";
import { FirebaseStorageService } from './firebase-storage.service';
import axios from 'axios';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>,

    private readonly firebaseStorageService: FirebaseStorageService,
    
  ) {}

  async saveFileData(file: Express.Multer.File, req: Request) {
 // Validate the file
 if (!file || !file.buffer || file.buffer.length === 0) {
  throw new BadRequestException('File buffer is empty SaveFileData');
}
    const fileUrl = await this.firebaseStorageService.uploadFile(file);
    return fileUrl;
     
    // const baseUrl = `${req.protocol}://${req.get('host')}`;
    // const filePath = `${baseUrl}/uploads/${file.filename}`;
    // const newFile = this.uploadedFileRepository.create({
    //   filename: file.filename,
    //   path: filePath,
    //   mimetype: file.mimetype,
    //   size: file.size,
    // });
    // return await this.uploadedFileRepository.save(newFile);
  }

  async saveFileDataFromUrl(fileUrl: string, req: Request): Promise<string> {
    if (!fileUrl) {
      throw new BadRequestException('File URL is required');
    }

    try {
      // Fetch the file from the given URL
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

      const data = response.data as Buffer;
      if (!data || data.length === 0) {
        throw new BadRequestException('Downloaded file is empty');
      }

      // Create a mock Express.Multer.File object
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: fileUrl.split('/').pop() || 'file',
        encoding: '7bit',
        mimetype: response.headers['content-type'],
        buffer: Buffer.from(data),
        size: data.length,
        destination: '',
        filename: '',
        path: '',
        stream: null,
      };

      // Upload file to Firebase Storage
      const savedFileUrl = await this.firebaseStorageService.uploadFile(file);
      return savedFileUrl;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch and save file: ${error.message}`);
    }
  }

  async saveMultipleFileData(files: Express.Multer.File[], req: Request) {

    // Map over the array of files and create metadata entries for each file
    const newFiles = files.map(async file => {
      // const filePath = `${baseUrl}/uploads/${file.filename}`;
      const fileUrl = await this.firebaseStorageService.uploadFile(file);

      return this.uploadedFileRepository.create({
        filename: file.filename,
        path: fileUrl,
        mimetype: file.mimetype,
        size: file.size,
      });
    });

    // Save all files metadata in a single operation if your ORM supports it
    return newFiles;
}

  async deleteFile(fileName: string) {
   
    await this.firebaseStorageService.deleteFile(fileName);
    return { message: "File deleted successfully" };
  }
}
