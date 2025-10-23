import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray, ValidateNested } from "class-validator";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { CreateChildFeatureDto } from "./create-child_features.dto";

@Entity('property_features')
export class CreatePropertyFeatureDto {
 @ApiProperty({
    example: 'In-Room Amenities',
    description: 'The name of the main hotel feature (parent)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'The active status of the parent feature',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    type: [CreateChildFeatureDto],
    description: 'List of child features belonging to this parent feature',
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
//   @Type(() => CreateChildFeatureDto)
  @IsOptional()
  childFeatures?: CreateChildFeatureDto[];
}
