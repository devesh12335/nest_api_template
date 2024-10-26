import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, Req } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/constants';
import { Request } from 'express';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Public()
  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadSingle(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new Error("File not received");
    }
    const meta = await this.fileService.saveFileData(file,req);
    return {
      message: 'Single file uploaded successfully!',
      file,
      metaData: meta
    };
  }

  @Public()
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[], @Req() req: Request) {
    if (!files) {
      throw new Error("Files are not received");
    }
    const metaList = [];
    files.forEach(async (file)=>{
      const meta =await  this.fileService.saveFileData(file,req);
      metaList.push(meta);
      
    });

    return {
      message: 'Multiple files uploaded successfully!',
      files,
      metaData: metaList

    };
  }
}


