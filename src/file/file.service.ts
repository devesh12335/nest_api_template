import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
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
    const filePath = `${baseUrl}/${file.path.replace(/\\/g, '/')}`;
    const newFile = this.uploadedFileRepository.create({
      filename: file.filename,
      path: filePath,
      mimetype: file.mimetype,
      size: file.size,
    });
    return await this.uploadedFileRepository.save(newFile);
  }
}
