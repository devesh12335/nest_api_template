import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBedTypeDto {
  @ApiProperty({
    description: 'Name of the bed type (e.g., King, Twin)',
    example: 'King',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  bed_type_name: string;

  @ApiProperty({
    description: 'Width of the bed in a chosen unit (e.g., meters)',
    example: 1.83,
    type: Number,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    description: 'Length of the bed in a chosen unit (e.g., meters)',
    example: 2.13,
    type: Number,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  length: number;

  // Optional: Array of RoomType IDs to link upon creation
  @ApiProperty({
    description: 'Array of RoomType IDs to associate with this bed type',
    example: [1, 5],
    type: [Number],
    required: false,
  })
  @IsNumber({}, { each: true })
  roomTypeIds?: number[];
}