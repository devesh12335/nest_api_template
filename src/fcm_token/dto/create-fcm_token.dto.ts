import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFcmTokenDto {
  @ApiProperty({ description: 'The FCM token value' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ description: 'The ID of the user associated with the FCM token' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
