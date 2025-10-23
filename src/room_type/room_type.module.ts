import { Module } from '@nestjs/common';
import { RoomTypeService } from './room_type.service';
import { RoomTypeController } from './room_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { BedType } from 'src/bed_types/entities/bed_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RoomType, BedType]),],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
})
export class RoomTypeModule {}
