import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Address } from './entities/address.entity';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new address for a customer (1:1)' })
  @ApiResponse({ status: 201, type: Address })
  create(@Body() dto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({ status: 200, type: [Address] })
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single address by ID' })
  @ApiParam({ name: 'id', description: 'Address ID (UUID)' })
  @ApiResponse({ status: 200, type: Address })
  findOne(@Param('id') id: number): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an address' })
  @ApiResponse({ status: 200, type: Address })
  update(@Param('id') id: number, @Body() dto: UpdateAddressDto): Promise<Address> {
    return this.addressService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an address' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number): Promise<void> {
    return this.addressService.remove(id);
  }
}
