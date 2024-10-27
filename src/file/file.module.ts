import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFile } from './entities/file.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports:[
    TypeOrmModule.forFeature([UploadedFile]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'), // Path to the uploads folder
      serveRoot: '/uploads', // This will make files accessible at /uploads
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
