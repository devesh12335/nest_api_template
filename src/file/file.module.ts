import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFile } from './entities/file.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UploadedFile])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
