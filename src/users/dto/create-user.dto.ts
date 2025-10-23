// src/user/dto/create-user.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsMobilePhone, length, IsArray, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name should not exceed 100 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Contact number is required' })
  contactNo: string;

  @ApiPropertyOptional({ description: 'Date of birth', type: String, format: 'date' })
  @IsString()
  dob?: string;

  @ApiPropertyOptional({ description: 'Gender', type: String })
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ description: 'Address', type: String })
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Auth ID', type: String })
  @IsString()
  authId?: string;


  @ApiPropertyOptional({ description: 'Delivery Partner Status(available/unavailable)', type: String })
  @IsString()
  delivery_partner_status?: string;

  @ApiProperty({ description: 'Role IDs', type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  roleIds: number[]; // IDs of roles to assign

  @ApiProperty({ description: 'Reset Password TOken', type: String})
  @IsOptional()
  @IsString()
  resetPasswordToken: string;

  @ApiProperty({ description: 'Reset Password TOken Expiry', type: Date})
  @IsOptional()
  @IsDate()
  resetPasswordExpires: String=new Date().toISOString();

  @ApiProperty({ description: 'Reset Password TOken created at', type: Date})
  @IsOptional()
  @IsDate()  
  createdAt: String=new Date().toISOString();

  @ApiProperty({ description: 'Reset Password TOken updated at', type: Date})
  @IsOptional()
  @IsDate()  
  updatedAt: String=new Date().toISOString();
}
