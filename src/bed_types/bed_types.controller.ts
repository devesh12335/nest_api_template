import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { BedTypeService } from './bed_types.service';
import { CreateBedTypeDto } from './dto/create-bed_type.dto';
import { UpdateBedTypeDto } from './dto/update-bed_type.dto';
import { BedType } from './entities/bed_type.entity';

@ApiTags('bed-types') // Groups endpoints in Swagger UI
@Controller('bed-types') // Base route path
export class BedTypeController {
  constructor(private readonly bedTypeService: BedTypeService) {}

  // POST /bed-types
  @Post()
  @ApiOperation({ summary: 'Create a new bed type' })
  @ApiResponse({
    status: 201,
    description: 'The bed type has been successfully created.',
    type: BedType,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: CreateBedTypeDto })
  create(@Body() createBedTypeDto: CreateBedTypeDto): Promise<BedType> {
    return this.bedTypeService.create(createBedTypeDto);
  }

  // GET /bed-types
  @Get()
  @ApiOperation({ summary: 'Retrieve all bed types' })
  @ApiResponse({
    status: 200,
    description: 'List of all bed types.',
    type: [BedType],
  })
  findAll(): Promise<BedType[]> {
    return this.bedTypeService.findAll();
  }

  // GET /bed-types/:id
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a bed type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found bed type.',
    type: BedType,
  })
  @ApiResponse({ status: 404, description: 'Bed type not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BedType> {
    return this.bedTypeService.findOne(id);
  }

  // PATCH /bed-types/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing bed type' })
  @ApiResponse({
    status: 200,
    description: 'The bed type has been successfully updated.',
    type: BedType,
  })
  @ApiResponse({ status: 404, description: 'Bed type not found.' })
  @ApiBody({ type: UpdateBedTypeDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBedTypeDto: UpdateBedTypeDto,
  ): Promise<BedType> {
    return this.bedTypeService.update(id, updateBedTypeDto);
  }

  // DELETE /bed-types/:id
  @Delete(':id')
  @HttpCode(204) // Use 204 No Content for successful deletion
  @ApiOperation({ summary: 'Delete a bed type by ID' })
  @ApiResponse({ status: 204, description: 'Bed type successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Bed type not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bedTypeService.remove(id);
  }
}