// src/room-type/entities/room-type.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BedType } from 'src/bed_types/entities/bed_type.entity';

@Entity('room_type') // Specifies the table name in the database
export class RoomType {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique ID', example: 1 })
  id: number; // integer (Primary Key, Auto-increment)

  @Column({ type: 'varchar', length: 100, unique: true })
  @ApiProperty({ description: 'Name of the room type', example: 'Deluxe Queen' })
  room_type: string; // varchar(100)

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Hotel ID', example: 1 })
  hotel_id: number; // integer (Foreign Key relationship usually added here)

  @Column({ type: 'boolean', default: false })
  @ApiProperty({ description: 'Visible in front office', example: true })
  show_front_office: boolean; // boolean

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Short description',
    example: 'A spacious room with a queen-sized bed.',
  })
  short_description: string; // varchar(255)

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Full description',
    example: 'Enjoy a luxurious stay with amenities.',
  })
  description: string; // text

//   @Column({ type: 'int', array: false })
//  @ApiProperty({
//     description: 'Array of BedType IDs to associate with this room type',
//     example: [1, 2],
//     type: [Number],
//     required: false,
//   })
//    bedTypeIds?: number[]; 

  @Column({ type: 'boolean', default: true })
  @ApiProperty({ description: 'Active status', example: true })
  is_active: boolean; // boolean

  @ManyToMany(() => BedType, (bedType) => bedType.roomTypes)
  bedTypes: BedType[];
}