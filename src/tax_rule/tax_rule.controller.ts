// src/tax-rule/tax-rule.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTaxRuleDto } from './dto/create-tax_rule.dto';
import { UpdateTaxRuleDto } from './dto/update-tax_rule.dto';
import { TaxRule } from './entities/tax_rule.entity';
import { TaxRuleService } from './tax_rule.service';

@ApiTags('Tax Rules')
@Controller('tax-rules')
export class TaxRuleController {
  constructor(private readonly taxRuleService: TaxRuleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tax rule' })
  @ApiBody({ type: CreateTaxRuleDto })
  @ApiResponse({ status: 201, description: 'The tax rule has been successfully created.', type: TaxRule })
  create(@Body() createTaxRuleDto: CreateTaxRuleDto) {
    // In a real app, you'd call a service method:
    // return this.taxRuleService.create(createTaxRuleDto);
    return { id: 4, ...createTaxRuleDto }; // Mock response
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tax rules' })
  @ApiResponse({ status: 200, description: 'List of all tax rules', type: [TaxRule] })
  findAll() {
    // return this.taxRuleService.findAll();
    return []; // Mock response
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single tax rule by ID' })
  @ApiParam({ name: 'id', description: 'Tax Rule ID', type: 'integer' })
  @ApiResponse({ status: 200, description: 'Tax rule found', type: TaxRule })
  @ApiResponse({ status: 404, description: 'Tax rule not found' })
  findOne(@Param('id') id: string) {
    // return this.taxRuleService.findOne(+id);
    return { id: +id, name: 'Standard Rate', is_active: true }; // Mock response
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing tax rule' })
  @ApiParam({ name: 'id', description: 'Tax Rule ID', type: 'integer' })
  @ApiBody({ type: UpdateTaxRuleDto })
  @ApiResponse({ status: 200, description: 'The tax rule has been successfully updated.', type: TaxRule })
  update(@Param('id') id: string, @Body() updateTaxRuleDto: UpdateTaxRuleDto) {
    // return this.taxRuleService.update(+id, updateTaxRuleDto);
    return { id: +id, name: 'Updated Rule', is_active: updateTaxRuleDto.is_active || true }; // Mock response
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tax rule' })
  @ApiParam({ name: 'id', description: 'Tax Rule ID', type: 'integer' })
  @ApiResponse({ status: 204, description: 'The tax rule has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tax rule not found' })
  remove(@Param('id') id: string) {
    // return this.taxRuleService.remove(+id);
    // Standard practice for DELETE is to return 204 No Content
    return;
  }
}