import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { contacts } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(contacts)
    private contactRepository:Repository<contacts>,
  ) {}
  async create(createContactDto: CreateContactDto):Promise<contacts> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact); 'This action adds a new contact';
  }

  async findAll():Promise<contacts[]> {
    return await this.contactRepository.find(); `This action returns all contact`;
  }

 async findOne(id: number):Promise<contacts> {
  const contact =await this.contactRepository.findOne({where:{id}});
  if(!contact){
    throw new NotFoundException(`Contact with ID ${id} not found`);
  }
    return contact; `This action returns a #${id} contact`;
  }

  async update(id: number, updateContactDto: UpdateContactDto):Promise<contacts> {
    const contact= await this.findOne(id);
    Object.assign(contact,updateContactDto);
    return await this.contactRepository.save(contact); `This action updates a #${id} contact`;
  }

  async remove(id: number):Promise<void> {
    const result=await this.contactRepository.delete(id);
    if(result.affected==0){
      throw new NotFoundException(`Contact with ID ${id} not found`);

    }
  }
}
