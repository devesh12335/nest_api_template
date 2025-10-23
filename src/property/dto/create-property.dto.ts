import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumberString,
  IsNumber,
  Min,
  Max,
  IsObject,
  Matches,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { PropertyImage } from 'src/property_image/entities/property_image.entity';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Grand Hyatt Hotel', description: 'Name of the property' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Luxury hotel in the city center', description: 'Brief overview', required: false })
  @IsString()
   @IsNotEmpty()
  short_description?: string;

  @ApiProperty({ example: 'A detailed description of the amenities...', description: 'Full property description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '1-555-123-4567', description: 'Contact phone number', required: false })
  @IsString()
   @IsNotEmpty()
  @Matches(/^\+?\d[\d\s-]{8,15}\d$/, { message: 'Phone number format is invalid' }) // Basic phone validation
  phone?: string;

  @ApiProperty({ example: 'contact@hotel.com', description: 'Contact email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123 Main St, Downtown', description: 'Full physical address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 4.8, description: 'Average customer rating (0.0 to 5.0)', required: false, type: 'number' })
  @IsNumber()
   @IsNotEmpty()
  @Min(0.0)
  @Max(5.0)
  rating?: number;

  @ApiProperty({ example: '15:00', description: 'Standard check-in time (HH:MM)', required: false })
  @IsString()
   @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Check-in time must be in HH:MM format' })
  check_in?: string;

  @ApiProperty({ example: '11:00', description: 'Standard check-out time (HH:MM)', required: false })
  @IsString()
   @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Check-out time must be in HH:MM format' })
  check_out?: string;

  @ApiProperty({ example: 'USA', description: 'Country location' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'New York', description: 'City location' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: '10001', description: 'Zip/Postal code', required: false })
  @IsString()
   @IsNotEmpty()
  @IsNumberString()
  zip_code?: string;

  @ApiProperty({
    example: { cancellation: '48 hours notice', smoking: 'Non-smoking rooms only' },
    description: 'Property policies ',
    required: true,
  })
   @IsNotEmpty()
  @IsString()
  policies?: string;

@ApiProperty({
    example: [1,2,3],
    description: 'List of id of the child features selected for this property.',
    required: false,
  })
  @IsArray()
  @IsOptional()
  selectedChildFeatureIds?: number[];
}