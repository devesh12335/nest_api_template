

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, MaxLength, IsOptional } from 'class-validator';

export class CreateTaxRuleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'Name of the tax rule',
    example: 'Reduced Rate VAT',
  })
  name: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Status of the tax rule (defaults to true if not provided)',
    example: true,
    required: false,
  })
  is_active?: boolean;
}