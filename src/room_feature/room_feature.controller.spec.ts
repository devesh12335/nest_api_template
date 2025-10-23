import { Test, TestingModule } from '@nestjs/testing';
import { RoomFeatureController } from './room_feature.controller';
import { RoomFeatureService } from './room_feature.service';

describe('RoomFeatureController', () => {
  let controller: RoomFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomFeatureController],
      providers: [RoomFeatureService],
    }).compile();

    controller = module.get<RoomFeatureController>(RoomFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
