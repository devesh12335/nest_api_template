import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdatePropertyFeaturesDto {
  @ApiProperty({
    example: [1,2,3],
    description: 'The complete list of Child Feature id that should be linked to the property. This replaces all existing selections.',
  })
  @IsArray()
 
  selectedChildFeatureIds: number[];
}