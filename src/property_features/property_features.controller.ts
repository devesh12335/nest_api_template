import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PropertyFeaturesService } from './property_features.service';
import { CreatePropertyFeatureDto } from './dto/create-property_feature.dto';
import { UpdatePropertyFeatureDto } from './dto/update-property_feature.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PropertyFeature } from './entities/property_feature.entity';

@ApiTags('Property Features') // Tag for Swagger grouping
@Controller('property-features')
export class PropertyFeaturesController {
  constructor(private readonly propertyFeaturesService: PropertyFeaturesService) {}

// POST /features
  @Post()
  @ApiOperation({ summary: 'Create a new parent feature with optional child features' })
  @ApiResponse({ status: 201, description: 'Feature successfully created', type: PropertyFeature })
  create(@Body() createFeatureDto: CreatePropertyFeatureDto) {
    return this.propertyFeaturesService.create(createFeatureDto);
  }

  // GET /features
  @Get()
  @ApiOperation({ summary: 'Retrieve all parent features with their child features' })
  @ApiResponse({ status: 200, description: 'List of features', type: [PropertyFeature] })
  findAll() {
    return this.propertyFeaturesService.findAll();
  }

  // GET /features/:id
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single parent feature by ID' })
  @ApiParam({ name: 'id', description: 'The id of the feature' })
  @ApiResponse({ status: 200, description: 'The found feature', type: PropertyFeature })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  findOne(@Param('id') id: number) {
    return this.propertyFeaturesService.findOne(id);
  }

  // PATCH /features/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing parent feature' })
  @ApiParam({ name: 'id', description: 'The id of the feature' })
  @ApiResponse({ status: 200, description: 'Feature successfully updated', type: PropertyFeature })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  update(@Param('id') id: number, @Body() updateFeatureDto: UpdatePropertyFeatureDto) {
    return this.propertyFeaturesService.update(id, updateFeatureDto);
  }

  // DELETE /features/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
  @ApiOperation({ summary: 'Delete a parent feature and all its related child features' })
  @ApiParam({ name: 'id', description: 'The id of the feature' })
  @ApiResponse({ status: 204, description: 'Feature successfully deleted' })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  remove(@Param('id') id: number) {
    return this.propertyFeaturesService.remove(id);
  }
}
