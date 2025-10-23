import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFile } from './entities/file.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FirebaseStorageService } from './firebase-storage.service';
import { FirebaseAdminModule } from '@alpha018/nestjs-firebase-auth';

@Module({
  imports:[
    TypeOrmModule.forFeature([UploadedFile]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'), // Path to the uploads folder
      serveRoot: '/uploads', // This will make files accessible at /uploads
    }),
    FirebaseAdminModule
  ],
  controllers: [FileController],
  providers: [FileService,FirebaseStorageService,
  ],
  exports: [FileService],
})
export class FileModule {

}
