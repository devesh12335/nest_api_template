// src/room-type/room-type.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  // NO NEED for @HttpCode(HttpStatus.CREATED) as @Post() defaults to 201
} from '@nestjs/common';
// ... other imports ...

import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { RoomTypeService } from './room_type.service';
import { RoomType } from './entities/room_type.entity';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';

@ApiTags('room_types')
@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room type' })
  // ApiResponse documentation for status 201
  @ApiResponse({
    status: 201, 
    description: 'The room type has been successfully created.',
    type: RoomType,
  })
  @ApiBody({ type: CreateRoomTypeDto })
  async create(@Body() createRoomTypeDto: CreateRoomTypeDto): Promise<RoomType> {
    // The @Post() decorator ensures a 201 status code on success.
    // The service handles saving the data, even if the table was initially empty.
    return await this.roomTypeService.create(createRoomTypeDto);
  }

  // All other methods must also be updated to use async/await
  @Get()
  async findAll(): Promise<RoomType[]> {
    return await this.roomTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RoomType> {
    return await this.roomTypeService.findOne(id);
  }
  
@Patch(':id')
  @ApiOperation({ summary: 'Update an existing room type' })
  @ApiParam({ name: 'id', description: 'Room Type ID', type: Number })
  @ApiBody({ type: UpdateRoomTypeDto })
  @ApiResponse({
    status: 200,
    description: 'The room type has been successfully updated.',
    type: RoomType,
  })
  @ApiResponse({ status: 404, description: 'Room Type not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ): Promise<RoomType> {
    return await this.roomTypeService.update(id, updateRoomTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room type by ID' })
  @ApiParam({ name: 'id', description: 'Room Type ID', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The room type has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Room Type not found.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.roomTypeService.remove(id);
  }
}