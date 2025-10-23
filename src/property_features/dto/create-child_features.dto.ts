import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateChildFeatureDto {
  @ApiProperty({ example: 'Free WiFi', description: 'Name of the child feature' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Availability status of the child feature',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}