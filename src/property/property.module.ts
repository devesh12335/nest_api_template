import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { ChildFeature } from 'src/property_features/entities/child_feature.entity';

@Module({
  imports: [
    // Register the Property entity with TypeORM for this module
    TypeOrmModule.forFeature([Property,ChildFeature]), 
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
