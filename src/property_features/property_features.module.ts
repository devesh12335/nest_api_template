import { Module } from '@nestjs/common';
import { PropertyFeaturesService } from './property_features.service';
import { PropertyFeaturesController } from './property_features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildFeature } from './entities/child_feature.entity';
import { PropertyFeature } from './entities/property_feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyFeature, ChildFeature])],
  controllers: [PropertyFeaturesController],
  providers: [PropertyFeaturesService],
})
export class PropertyFeaturesModule {}
