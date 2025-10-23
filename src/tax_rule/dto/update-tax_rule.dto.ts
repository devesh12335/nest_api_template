import { PartialType } from '@nestjs/swagger';
import { CreateTaxRuleDto } from './create-tax_rule.dto';

export class UpdateTaxRuleDto extends PartialType(CreateTaxRuleDto) {}
