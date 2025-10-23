import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 3)
  @ApiProperty({
    description: 'ISO code of the state',
    example: 'MH',
    minLength: 2,
    maxLength: 3,
  })
  iso_code: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @ApiProperty({
    description: 'Full name of the state',
    example: 'Maharashtra',
    maxLength: 100,
  })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Foreign key reference to the parent country',
    example: 101,
    type: 'integer',
  })
  country_id: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Foreign key reference to a geographical zone (optional)',
    example: 5,
    type: 'integer',
    nullable: true,
    required: false,
  })
  zone_id?: number | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Status of the state',
    example: true,
    type: 'boolean',
    required: false,
  })
  is_active?: boolean = true;
}