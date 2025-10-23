import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'ID12345', required: false })
  identificationNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Home', required: false })
  alias?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John', required: false })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe', required: false })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Acme Corp', required: false })
  company?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'VAT987654', required: false })
  vatNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123 Main Street', required: false })
  address1?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Apartment 4B', required: false })
  address2?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '110001', required: false })
  zipCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'New Delhi', required: false })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'India', required: false })
  country?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Delhi', required: false })
  state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '011-23456789', required: false })
  homePhone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '9876543210', required: false })
  mobilePhone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Near Park', required: false })
  other?: string;

  @ApiProperty({ example: 1, description: 'Customer ID for relation' })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;
}
