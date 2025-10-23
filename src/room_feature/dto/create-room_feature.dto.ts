// src/room-features/dto/create-room-feature.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

export class CreateRoomFeatureDto {
  @ApiProperty({
    description: 'Name of the room feature',
    example: 'Gym Access',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Link (URL) to the logo/icon of the room feature',
    example: 'https://example.com/logos/gym.svg',
    format: 'url',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  logo: string;
}