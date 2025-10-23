// src/user/user.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, Req, ExecutionContext } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard, RolesGuard } from '@alpha018/nestjs-firebase-auth';
import { Roles } from 'src/firebase_auth/roles.enum';





@ApiTags('Users')
@ApiBearerAuth('bearerAuth')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    return this.userService.create(createUserDto,req);
  }

  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.USER)
  @Get()
  findAll() {
    try{
      
       return "Protected Route testing"
    }catch(e){console.log(e)}
   
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

