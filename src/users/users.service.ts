
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';


import Redis from 'ioredis';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
     @Inject('REDIS_CLIENT') private redis: Redis

  ) {}

  async create(createUserDto: CreateUserDto,req:Request) {
    return await this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  

  async findOne(id: number) {
    const data= await this.userRepository.findOne({ where: { id } });
    return data;
  }
  
  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  } 
  
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
