// src/room-features/dto/update-room-feature.dto.ts

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { CreateRoomFeatureDto } from './create-room_feature.dto';

// PartialType makes all properties from CreateRoomFeatureDto optional
export class UpdateRoomFeatureDto extends PartialType(CreateRoomFeatureDto) {
  // Adding custom decorators if needed, but PartialType handles making them optional
  @ApiProperty({
    description: 'Updated name of the room feature',
    example: 'High-Speed Wi-Fi',
    required: false,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    description: 'Updated logo link of the room feature',
    example: 'https://example.com/logos/high-speed-wifi.svg',
    required: false,
    format: 'url',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  logo?: string;
}