import { PartialType } from '@nestjs/mapped-types';
import { CreateFcmTokenDto } from './create-fcm_token.dto';

export class UpdateFcmTokenDto extends PartialType(CreateFcmTokenDto) {}
