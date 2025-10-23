import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @ApiProperty({ example: '4.9', description: 'New rating value', required: false })
  rating?: number;
}