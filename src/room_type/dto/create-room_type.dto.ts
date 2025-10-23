// src/room-type/dto/create-room-type.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsNumber,
} from 'class-validator';

export class CreateRoomTypeDto {
  @ApiProperty({
    description: 'Unique identifier of the hotel this room type belongs to',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  hotel_id: number;

  @ApiProperty({
    description: 'Name of the room type',
    example: 'Deluxe Queen',
  })
  @IsString()
  @IsNotEmpty()
  room_type: string;

  @ApiProperty({
    description: 'Whether this room type should be visible in the front office system',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  show_front_office: boolean;

  @ApiProperty({
    description: 'Brief description of the room type',
    example: 'A spacious room with a queen-sized bed.',
    required: false,
  })
  @IsString()
  @IsOptional()
  short_description?: string;

  @ApiProperty({
    description: 'Detailed description of the room type amenities and features',
    example: 'Enjoy a luxurious stay with complimentary breakfast and high-speed Wi-Fi.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

 @ApiProperty({
    description: 'Array of BedType IDs to associate with this room type',
    example: [1, 2],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  bedTypeIds?: number[];

  @ApiProperty({
    description: 'Current active status of the room type',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;
}