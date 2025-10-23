// src/room-features/room-feature.entity.ts

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Assuming you are using TypeORM. If not, adjust decorators accordingly.
// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('room_features') 
export class RoomFeature {
  @ApiProperty({ description: 'Unique identifier for the room feature', example: 1 })
  @PrimaryGeneratedColumn() 
  id: number;

  @ApiProperty({ description: 'Name of the room feature', example: 'Free Wi-Fi', maxLength: 50 })
  @Column({ length: 50 }) 
  name: string;

  @ApiProperty({
    description: 'Link (URL) to the logo/icon of the room feature',
    example: 'https://example.com/logos/wifi.png',
    format: 'url',
  })
  @Column('text') 
  logo: string;
}