import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile, Req, BadRequestException } from '@nestjs/common';
import { FileService } from './file.service';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants';
import { Request } from 'express';

@ApiTags('file')
@ApiBearerAuth('bearerAuth')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file')) // Accept file input
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

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 5),
  )
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[], @Req() req: Request) {
    if (!files) {
      throw new Error("Files are not received");
    }
  
      const meta =await  this.fileService.saveMultipleFileData(files,req);
     

    return {
      message: 'Multiple files uploaded successfully!',
      // files,
      metaData: meta

    };
  }

  // @Public()
  // @Post('upload-from-url')
  @Public()
  @Post('upload-from-url')
  async uploadFileFromUrl(@Body('fileUrl') fileUrl: string, @Req() req: Request) {
    if (!fileUrl) {
      throw new BadRequestException('File URL is required');
    }
    
    const newFileUrl = await this.fileService.saveFileDataFromUrl(fileUrl, req);
    return { url: newFileUrl };
  }

  @Delete('deletefile/:fileName')
  async deletefile(@Param('fileName') fileName:string) {
   
  console.log("fileName",fileName);
      await  this.fileService.deleteFile(fileName);
     

    return {
      message: 'file Deleted successfully!',
      

    };
  }
}


