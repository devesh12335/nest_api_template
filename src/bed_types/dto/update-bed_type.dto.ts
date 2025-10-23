import { PartialType } from '@nestjs/swagger';
import { CreateBedTypeDto } from './create-bed_type.dto';

export class UpdateBedTypeDto extends PartialType(CreateBedTypeDto) {}
