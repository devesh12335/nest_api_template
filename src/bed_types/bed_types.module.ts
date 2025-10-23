import { Module } from '@nestjs/common';
import { BedTypeService } from './bed_types.service';
import { BedTypeController } from './bed_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedType } from './entities/bed_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BedType])],
  controllers: [BedTypeController],
  providers: [BedTypeService],
})
export class BedTypesModule {}
