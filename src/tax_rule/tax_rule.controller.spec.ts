import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleController } from './tax_rule.controller';
import { TaxRuleService } from './tax_rule.service';

describe('TaxRuleController', () => {
  let controller: TaxRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRuleController],
      providers: [TaxRuleService],
    }).compile();

    controller = module.get<TaxRuleController>(TaxRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
