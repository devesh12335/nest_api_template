import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'United States', description: 'Full country name' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  country: string;

  @ApiProperty({ example: 'USA', description: 'ISO 3166-1 alpha-3 code', maxLength: 3 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  iso_code: string;

  @ApiProperty({ example: '+1', description: 'International phone prefix', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  phone_prefix?: string;

  @ApiProperty({ example: 1, description: 'ID of the associated currency' })
  @IsInt()
  @IsNotEmpty()
  currency_id: number;

  @ApiProperty({ example: 1, description: 'ID of the associated zone' })
  @IsInt()
  @IsNotEmpty()
  zone_id: number;

  @ApiProperty({ example: '90210', description: 'Default postal code or format', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  postal_code?: string;

  @ApiProperty({ example: true, description: 'Indicates if the country uses a tax label' })
  @IsBoolean()
  @IsOptional()
  is_tax_label?: boolean = false;

  @ApiProperty({ example: 1, description: 'ID of the associated tax rule/rate', required: false })
  @IsOptional()
  @IsInt()
  tax_id?: number;

  @ApiProperty({ example: true, description: 'Active status of the country' })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;
}