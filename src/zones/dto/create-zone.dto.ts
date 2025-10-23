import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateZoneDto {
  @ApiProperty({ description: 'The unique name of the zone', example: 'Asia' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Status indicating if the zone is active',
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}