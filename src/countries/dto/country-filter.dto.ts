import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum CountryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BOTH = 'both',
}

export class CountryFilterDto {
  @ApiProperty({
    enum: CountryStatus,
    default: CountryStatus.ACTIVE,
    description: 'Filter countries by status: active, inactive, or both.',
    required: false,
  })
  @IsOptional()
  @IsEnum(CountryStatus)
  status: CountryStatus = CountryStatus.ACTIVE;
}