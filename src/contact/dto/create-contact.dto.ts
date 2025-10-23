import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateContactDto {
  
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Mr', required: false, description: 'Title of the contact' })
  title?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'Max23@gmail.com', required: false, description: 'Email address of the contact' })
  email?: string;

  @IsBoolean()
  @ApiProperty({ example: true, required: true, description: 'Whether to save messages or not' })
  saveMessages: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'This is a description', required: false, description: 'Additional notes or description' })
  description?: string;
}
