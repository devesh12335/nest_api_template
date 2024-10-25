// src/user/dto/create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsMobilePhone, length } from 'class-validator';
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
}
