import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { contacts } from './entities/contact.entity';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
