import { Module } from '@nestjs/common';
import { TaxRuleService } from './tax_rule.service';
import { TaxRuleController } from './tax_rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxRule } from './entities/tax_rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxRule])],
  controllers: [TaxRuleController],
  providers: [TaxRuleService],
})
export class TaxRuleModule {}
