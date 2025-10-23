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
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';


@ApiTags('Taxes')
@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tax record' })
  @ApiBody({ type: CreateTaxDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The tax has been successfully created.',
    type: Tax,
  })
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxesService.create(createTaxDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tax records' })
  @ApiOkResponse({
    description: 'List of all taxes',
    type: [Tax],
  })
  findAll() {
    return this.taxesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a tax record by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The tax record',
    type: Tax,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tax not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taxesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing tax record' })
  @ApiBody({ type: UpdateTaxDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The tax has been successfully updated.',
    type: Tax,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tax not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaxDto: UpdateTaxDto,
  ) {
    return this.taxesService.update(id, updateTaxDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a tax record by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The tax has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tax not found',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taxesService.remove(id);
  }
}