import { Test, TestingModule } from '@nestjs/testing';
import { BedTypesController } from './bed_types.controller';
import { BedTypesService } from './bed_types.service';

describe('BedTypesController', () => {
  let controller: BedTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BedTypesController],
      providers: [BedTypesService],
    }).compile();

    controller = module.get<BedTypesController>(BedTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
