// property_images/property_image.controller.ts
import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query, 
  UseGuards
} from '@nestjs/common';
import { PropertyImageService } from './property_image.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreatePropertyImageDto } from './dto/create-property_image.dto';
import { UpdatePropertyImageDto } from './dto/update-property_image.dto';
import { FirebaseGuard, RolesGuard } from '@alpha018/nestjs-firebase-auth';
import { Roles } from 'src/firebase_auth/roles.enum';

@ApiTags('Property Images')
@Controller('property-images')
export class PropertyImageController {
  constructor(private readonly propertyImageService: PropertyImageService) {}

  // ------------------- CREATE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Add a new image link for a hotel' })
  @ApiBody({ type: CreatePropertyImageDto })
  @ApiResponse({ status: 201, description: 'Image added successfully.' })
  create(@Body() createPropertyImageDto: CreatePropertyImageDto) {
    return this.propertyImageService.create(createPropertyImageDto);
  }

  // ------------------- READ ALL (with optional filter) -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN,Roles.USER)
  @Get()
  @ApiOperation({ summary: 'Get all images, optionally filtered by hotel ID' })
  @ApiQuery({ name: 'hotelId', required: false, type: 'number', description: 'Filter images by the associated hotel id.' })
  @ApiResponse({ status: 200, description: 'List of property images.' })
  findAll(@Query('hotelId') hotelId: number) {
    return this.propertyImageService.findAll(hotelId);
  }

  // ------------------- READ ONE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN,Roles.USER)
  @Get(':id')
  @ApiOperation({ summary: 'Get a single image by its ID' })
  @ApiParam({ name: 'id', description: 'The id of the image.', type: 'number' })
  @ApiResponse({ status: 200, description: 'The requested image object.' })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  findOne(@Param('id') id: number) {
    return this.propertyImageService.findOne(id);
  }

  // ------------------- UPDATE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing image link (e.g., change the URL or hotel ID)' })
  @ApiParam({ name: 'id', description: 'The id of the image to update.', type: 'number' })
  @ApiBody({ type: UpdatePropertyImageDto })
  @ApiResponse({ status: 200, description: 'Image updated successfully.' })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  update(@Param('id') id: number, @Body() updatePropertyImageDto: UpdatePropertyImageDto) {
    return this.propertyImageService.update(id, updatePropertyImageDto);
  }

  // ------------------- DELETE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a property image' })
  @ApiParam({ name: 'id', description: 'The id of the image to delete.', type: 'number' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  remove(@Param('id') id: number) {
    return this.propertyImageService.remove(id);
  }
}