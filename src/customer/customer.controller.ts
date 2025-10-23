import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({summary:'Create a new customer'})
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({summary:'Get all customers'})
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Get customer by ID'})
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary:'Update customer by ID'})
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete customer by ID'})
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
