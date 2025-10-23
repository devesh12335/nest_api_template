import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Zone } from './entities/zone.entity';

@ApiTags('zones') // Group endpoints under 'zones' in Swagger UI
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new zone' })
  @ApiBody({ type: CreateZoneDto })
  @ApiResponse({
    status: 201,
    description: 'The zone has been successfully created.',
    type: Zone,
  })
  async create(@Body() createZoneDto: CreateZoneDto): Promise<Zone> {
    
return this.zonesService.create(createZoneDto);
  
    
  }

  @Get()
  @ApiOperation({ summary: 'Get all active zones' })
  @ApiResponse({
    status: 200,
    description: 'List of all active zones.',
    type: [Zone],
  })
  async findAll(): Promise<Zone[]> {
    // This calls the service method configured to fetch only active zones
    return this.zonesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a zone by ID' })
  @ApiParam({ name: 'id', description: 'Zone ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'The zone details.',
    type: Zone,
  })
  @ApiResponse({ status: 404, description: 'Zone not found.' })
  async findOne(@Param('id') id: string): Promise<Zone> {
    return this.zonesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing zone' })
  @ApiParam({ name: 'id', description: 'Zone ID', type: 'integer' })
  @ApiBody({ type: CreateZoneDto })
  @ApiResponse({
    status: 200,
    description: 'The zone has been successfully updated.',
    type: Zone,
  })
  @ApiResponse({ status: 404, description: 'Zone not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateZoneDto: CreateZoneDto,
  ): Promise<Zone> {
    return this.zonesService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletes a zone by ID' })
  @ApiParam({ name: 'id', description: 'Zone ID', type: 'integer' })
  @ApiResponse({ status: 204, description: 'The zone has been deleted.' })
  @ApiResponse({ status: 404, description: 'Zone not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.zonesService.remove(+id);
  }
}