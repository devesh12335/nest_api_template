// src/room-features/room-features.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomFeatureDto } from './dto/create-room_feature.dto';
import { UpdateRoomFeatureDto } from './dto/update-room_feature.dto';
import { RoomFeature } from './entities/room_feature.entity';


@Injectable()
export class RoomFeaturesService {
  // Mock data store for demonstration.
  // In a real app, you'd use TypeORM/Prisma to interact with a database.
  private roomFeatures: RoomFeature[] = [
    { id: 1, name: 'Air Conditioning', logo: 'https://example.com/ac.png' },
    { id: 2, name: 'Smart TV', logo: 'https://example.com/tv.png' },
  ];
  private nextId = 3;

  /** CREATE */
  create(createRoomFeatureDto: CreateRoomFeatureDto): RoomFeature {
    const newFeature: RoomFeature = {
      id: this.nextId++,
      ...createRoomFeatureDto,
    };
    this.roomFeatures.push(newFeature);
    return newFeature;
  }

  /** READ (ALL) */
  findAll(): RoomFeature[] {
    return this.roomFeatures;
  }

  /** READ (ONE) */
  findOne(id: number): RoomFeature {
    const feature = this.roomFeatures.find(f => f.id === id);
    if (!feature) {
      throw new NotFoundException(`Room Feature with ID ${id} not found.`);
    }
    return feature;
  }

  /** UPDATE */
  update(id: number, updateRoomFeatureDto: UpdateRoomFeatureDto): RoomFeature {
    const index = this.roomFeatures.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`Room Feature with ID ${id} not found.`);
    }

    this.roomFeatures[index] = {
      ...this.roomFeatures[index],
      ...updateRoomFeatureDto,
    };
    return this.roomFeatures[index];
  }

  /** DELETE */
  remove(id: number): void {
    const initialLength = this.roomFeatures.length;
    this.roomFeatures = this.roomFeatures.filter(f => f.id !== id);
    if (this.roomFeatures.length === initialLength) {
      throw new NotFoundException(`Room Feature with ID ${id} not found.`);
    }
  }
}