import { PartialType } from '@nestjs/swagger';
import { CreatePropertyFeatureDto } from './create-property_feature.dto';

export class UpdatePropertyFeatureDto extends PartialType(CreatePropertyFeatureDto) {}
