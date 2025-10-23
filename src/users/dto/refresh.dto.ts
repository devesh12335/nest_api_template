import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRefreshTokenDto {
  @ApiProperty({ description: 'Unique ID of the user', example: 1 })
  user_id: number;

  @ApiProperty({ description: 'Refresh token', example: 'refresh token', required: false })
  refresh_token?: string;
}
export class UpdateRefreshDto extends PartialType(CreateRefreshTokenDto) {}
