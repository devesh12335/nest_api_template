import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UploadedFile } from './entities/file.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>,
  ) {}

  async saveFileData(file: Express.Multer.File, req: Request) {
     
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const filePath = `${baseUrl}/uploads/${file.filename}`;
    const newFile = this.uploadedFileRepository.create({
      filename: file.filename,
      path: filePath,
      mimetype: file.mimetype,
      size: file.size,
    });
    return await this.uploadedFileRepository.save(newFile);
  }

  async saveMultipleFileData(files: Express.Multer.File[], req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Map over the array of files and create metadata entries for each file
    const newFiles = files.map(file => {
      const filePath = `${baseUrl}/uploads/${file.filename}`;
      return this.uploadedFileRepository.create({
        filename: file.filename,
        path: filePath,
        mimetype: file.mimetype,
        size: file.size,
      });
    });

    // Save all files metadata in a single operation if your ORM supports it
    return await this.uploadedFileRepository.save(newFiles);
}
}
