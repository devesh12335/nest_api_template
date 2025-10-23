// src/room-type/room-type.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';
import { RoomType } from './entities/room_type.entity';
import { BedType } from 'src/bed_types/entities/bed_type.entity';


@Injectable()
export class RoomTypeService {
  constructor(
    // Inject the TypeORM Repository for the RoomType entity
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
    @InjectRepository(BedType) // Inject the BedType repository to handle associations
    private bedTypeRepository: Repository<BedType>,
  ) {}

private async getBedTypes(ids: number[]): Promise<BedType[]> {
    if (!ids || ids.length === 0) return [];
    
    // Fetch BedType entities by their IDs
    const bedTypes = await this.bedTypeRepository.findByIds(ids);
    
    if (bedTypes.length !== ids.length) {
      // Find missing IDs for a clear error message
      const foundIds = bedTypes.map(bt => bt.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`BedType IDs not found: ${missingIds.join(', ')}`);
    }
    return bedTypes;
  }

  // **CREATE**
  async create(createRoomTypeDto: CreateRoomTypeDto): Promise<RoomType> {
    const { bedTypeIds, ...roomTypeData } = createRoomTypeDto;
    
    const bedTypes = await this.getBedTypes(bedTypeIds);
    
    const newRoomType = this.roomTypeRepository.create({
      ...roomTypeData,
      bedTypes: bedTypes, // Set the associated entities
    });
    
    return this.roomTypeRepository.save(newRoomType);
  }

  // **READ** (Include relations)
  findAll(): Promise<RoomType[]> {
    return this.roomTypeRepository.find({
      relations: ['bedTypes'], // Eagerly load the associated bed types
    });
  }

  findOne(id: number): Promise<RoomType> {
    const roomType = this.roomTypeRepository.findOne({
      where: { id },
      relations: ['bedTypes'],
    });
    if (!roomType) {
        throw new NotFoundException(`RoomType with ID ${id} not found.`);
    }
    return roomType;
  }

  // **UPDATE**
  async update(id: number, updateRoomTypeDto: UpdateRoomTypeDto): Promise<RoomType> {
    const { bedTypeIds, ...roomTypeData } = updateRoomTypeDto;
    
    const roomType = await this.roomTypeRepository.findOne({ where: { id } });
    if (!roomType) {
      throw new NotFoundException(`RoomType with ID ${id} not found.`);
    }

    // 1. Update scalar fields
    this.roomTypeRepository.merge(roomType, roomTypeData);

    // 2. Update relationship if bedTypeIds is provided
    if (bedTypeIds !== undefined) {
      roomType.bedTypes = await this.getBedTypes(bedTypeIds);
    }

    return this.roomTypeRepository.save(roomType); // TypeORM handles relationship updates here
  }

  async remove(id: number): Promise<void> {
    // Attempt to delete the record by ID
    const result = await this.roomTypeRepository.delete(id);

    // If no rows were affected, the entity didn't exist
    if (result.affected === 0) {
      throw new NotFoundException(`RoomType with ID ${id} not found`);
    }
  }
}