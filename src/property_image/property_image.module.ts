import { Module } from '@nestjs/common';
import { PropertyImageService } from './property_image.service';
import { PropertyImageController } from './property_image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyImage } from './entities/property_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyImage])],
  controllers: [PropertyImageController],
  providers: [PropertyImageService],
})
export class PropertyImageModule {}
