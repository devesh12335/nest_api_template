import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'The email of the user requesting a password reset' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class ResetPasswordDto {
  @ApiProperty({ description: 'The reset token sent via email' })
  @IsString()
  token: string;

  @ApiProperty({ description: 'The new password' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}