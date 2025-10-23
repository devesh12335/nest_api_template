import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { FirebaseGuard, RolesGuard } from '@alpha018/nestjs-firebase-auth';
import { Roles } from 'src/firebase_auth/roles.enum';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // ------------------- CREATE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new property listing' })
  @ApiBody({ type: CreatePropertyDto })
  @ApiResponse({ status: 201, description: 'The property has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  // ------------------- READ ALL -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN,Roles.USER)
  @Get()
  @ApiOperation({ summary: 'Retrieve all property listings' })
  @ApiResponse({ status: 200, description: 'List of all properties.' })
  findAll() {
    return this.propertyService.findAll();
  }

  // ------------------- READ ONE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN,Roles.USER)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a property by its ID' })
  @ApiParam({ name: 'id', description: 'The id of the property', type: 'number' })
  @ApiResponse({ status: 200, description: 'The requested property.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  findOne(@Param('id') id: number) {
    return this.propertyService.findOne(id);
  }

  // ------------------- UPDATE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing property listing' })
  @ApiParam({ name: 'id', description: 'The id of the property to update', type: 'number' })
  @ApiBody({ type: UpdatePropertyDto })
  @ApiResponse({ status: 200, description: 'The property has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  update(@Param('id') id: number, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  // ------------------- DELETE -------------------
  @UseGuards(FirebaseGuard)
  @RolesGuard(Roles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a property listing' })
  @ApiParam({ name: 'id', description: 'The id of the property to delete', type: 'number' })
  @ApiResponse({ status: 200, description: 'The property has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  remove(@Param('id') id: number) {
    return this.propertyService.remove(id);
  }
}