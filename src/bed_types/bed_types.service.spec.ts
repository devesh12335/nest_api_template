import { Test, TestingModule } from '@nestjs/testing';
import { BedTypesService } from './bed_types.service';

describe('BedTypesService', () => {
  let service: BedTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BedTypesService],
    }).compile();

    service = module.get<BedTypesService>(BedTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
