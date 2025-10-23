import { Module } from '@nestjs/common';
import { RoomFeaturesService } from './room_feature.service';
import { RoomFeaturesController } from './room_feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomFeature } from './entities/room_feature.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RoomFeature])],
  controllers: [RoomFeaturesController],
  providers: [RoomFeaturesService],
})
export class RoomFeatureModule {}
