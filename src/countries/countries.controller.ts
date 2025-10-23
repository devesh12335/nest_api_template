import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { CountryFilterDto, CountryStatus } from './dto/country-filter.dto';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // ----------------------------------------------------
  // CREATE
  // ----------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Create a new country record' })
  @ApiResponse({ status: 201, description: 'The country has been successfully created.', type: Country })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: CreateCountryDto })
  create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countriesService.create(createCountryDto);
  }

  // ----------------------------------------------------
  // FIND ALL (with custom filter)
  // ----------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Retrieve all countries with optional active/inactive filter' })
  @ApiResponse({ status: 200, description: 'List of countries.', type: [Country] })
  @ApiQuery({ name: 'status', enum: CountryStatus, required: false, description: 'Filter by active/inactive status' })
  findAll(@Query() filterDto: CountryFilterDto): Promise<Country[]> {
    // Logic to translate the status filter to a database query condition
    let isActive: boolean | 'both' = true; // Default to active

    switch (filterDto.status) {
      case CountryStatus.INACTIVE:
        isActive = false;
        break;
      case CountryStatus.BOTH:
        isActive = 'both';
        break;
      case CountryStatus.ACTIVE:
      default:
        isActive = true;
        break;
    }
    
    return this.countriesService.findAll(isActive);
  }

  // ----------------------------------------------------
  // FIND ONE
  // ----------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a country by ID' })
  @ApiResponse({ status: 200, description: 'The country record.', type: Country })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @ApiParam({ name: 'id', description: 'Country ID', type: Number })
  findOne(@Param('id') id: string): Promise<Country> {
    return this.countriesService.findOne(+id);
  }

  // ----------------------------------------------------
  // UPDATE
  // ----------------------------------------------------
  @Patch(':id')
  @ApiOperation({ summary: 'Update a country record' })
  @ApiResponse({ status: 200, description: 'The country has been successfully updated.', type: Country })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @ApiBody({ type: UpdateCountryDto })
  @ApiParam({ name: 'id', description: 'Country ID', type: Number })
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto): Promise<Country> {
    return this.countriesService.update(+id, updateCountryDto);
  }

  // ----------------------------------------------------
  // DELETE
  // ----------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country record' })
  @ApiResponse({ status: 200, description: 'The country has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @ApiParam({ name: 'id', description: 'Country ID', type: Number })
  remove(@Param('id') id: string): Promise<void> {
    return this.countriesService.remove(+id);
  }
}