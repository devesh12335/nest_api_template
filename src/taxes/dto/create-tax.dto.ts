import { IsString, IsNotEmpty, IsNumber, Min, IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaxDto {
  @ApiProperty({
    description: 'Name of the tax',
    example: 'Value Added Tax (VAT)',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Tax rate (0.0 to 1.0)',
    example: 0.12,
    type: 'number',
    format: 'float',
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  rate: number;

  @ApiProperty({
    description: 'Initial status of the tax',
    example: true,
    required: false,
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}