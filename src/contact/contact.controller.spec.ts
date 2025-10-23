import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { contacts } from './entities/contact.entity';

describe('ContactController', () => {
  let controller: ContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        ContactService,
        {
          provide:getRepositoryToken(contacts),
          useValue:{
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          }
        }
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
