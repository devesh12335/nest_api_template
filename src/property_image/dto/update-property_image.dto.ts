import { PartialType } from '@nestjs/swagger';
import { CreatePropertyImageDto } from './create-property_image.dto';

export class UpdatePropertyImageDto extends PartialType(CreatePropertyImageDto) {}
