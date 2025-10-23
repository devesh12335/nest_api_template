import {  IsUrl, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyImageDto {
  @ApiProperty({ example: 0, description: 'The ID of the hotel this image belongs to.' })
  @IsNumber()
  @IsNotEmpty()
  hotel_id: number;

  @ApiProperty({ example: 'https://example.com/images/hotel_exterior.jpg', description: 'The direct URL link to the image.' })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  img_link: string;
}