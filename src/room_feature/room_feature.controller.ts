// src/room-features/room-features.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateRoomFeatureDto } from './dto/create-room_feature.dto';
import { UpdateRoomFeatureDto } from './dto/update-room_feature.dto';
import { RoomFeature } from './entities/room_feature.entity';
import { RoomFeaturesService } from './room_feature.service';

@ApiTags('Room Features') // Top-level Swagger tag
@Controller('room-features')
export class RoomFeaturesController {
  constructor(private readonly roomFeaturesService: RoomFeaturesService) {}

  // ------------------------------------------------------------------
  // CREATE (POST /room-features)
  // ------------------------------------------------------------------
  @Post()
  @HttpCode(HttpStatus.CREATED) // Explicitly set 201 status code
  @ApiOperation({ summary: 'Create a new room feature' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The room feature has been successfully created.',
    type: RoomFeature,
  })
  @ApiBody({ type: CreateRoomFeatureDto })
  create(@Body() createRoomFeatureDto: CreateRoomFeatureDto): RoomFeature {
    return this.roomFeaturesService.create(createRoomFeatureDto);
  }

  // ------------------------------------------------------------------
  // READ ALL (GET /room-features)
  // ------------------------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Retrieve all room features' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved list of room features.',
    type: [RoomFeature], // Array of the entity
  })
  findAll(): RoomFeature[] {
    return this.roomFeaturesService.findAll();
  }

  // ------------------------------------------------------------------
  // READ ONE (GET /room-features/:id)
  // ------------------------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single room feature by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved room feature.',
    type: RoomFeature,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Room Feature not found.',
  })
  findOne(@Param('id', ParseIntPipe) id: number): RoomFeature {
    return this.roomFeaturesService.findOne(id);
  }

  // ------------------------------------------------------------------
  // UPDATE (PATCH /room-features/:id)
  // ------------------------------------------------------------------
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing room feature' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The room feature has been successfully updated.',
    type: RoomFeature,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Room Feature not found.',
  })
  @ApiBody({ type: UpdateRoomFeatureDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomFeatureDto: UpdateRoomFeatureDto,
  ): RoomFeature {
    return this.roomFeaturesService.update(id, updateRoomFeatureDto);
  }

  // ------------------------------------------------------------------
  // DELETE (DELETE /room-features/:id)
  // ------------------------------------------------------------------
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 status code for successful deletion
  @ApiOperation({ summary: 'Delete a room feature by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The room feature has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Room Feature not found.',
  })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.roomFeaturesService.remove(id);
  }
}