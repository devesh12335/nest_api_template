// src/tax-rule/tax-rule.service.ts

import { Injectable } from '@nestjs/common';
import { CreateTaxRuleDto } from './dto/create-tax_rule.dto';
import { UpdateTaxRuleDto } from './dto/update-tax_rule.dto';
import { TaxRule } from './entities/tax_rule.entity';


@Injectable()
export class TaxRuleService {
  // Mock implementations for demonstration

  create(createTaxRuleDto: CreateTaxRuleDto): TaxRule {
    // Logic to save to database
    return { id: Math.floor(Math.random() * 100), ...createTaxRuleDto };
  }

  findAll(): TaxRule[] {
    // Logic to fetch all from database
    return [];
  }

  findOne(id: number): TaxRule | null {
    // Logic to fetch one by id
    return { id, name: 'Standard Rate', is_active: true };
  }

  update(id: number, updateTaxRuleDto: UpdateTaxRuleDto): TaxRule {
    // Logic to update in database
    return { id, name: 'Updated Rule', is_active: updateTaxRuleDto.is_active || true };
  }

  remove(id: number): void {
    // Logic to delete from database
    console.log(`TaxRule with ID ${id} deleted.`);
  }
}