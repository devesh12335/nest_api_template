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
}
