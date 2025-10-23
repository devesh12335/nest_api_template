import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';  
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { threadCpuUsage } from 'process';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private CustomerRepository: Repository<Customer>,
  ) {}
  create(createCustomerDto: CreateCustomerDto) {
    const customer = this.CustomerRepository.create(createCustomerDto);
    return this.CustomerRepository.save(customer); 'This action adds a new customer';
  }

  findAll() {
    return this.CustomerRepository.find(); `This action returns all customer`;
  }

 async findOne(id: number) {
  const customer = await this.CustomerRepository.findOne({where: {id} });
  if(!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer; `This action returns a #${id} customer`;
  }

 async update(id: number, updateCustomerDto: UpdateCustomerDto) {
  const customer=await this.findOne(id);
  Object.assign(customer,updateCustomerDto);
    return this.CustomerRepository.save(customer);  `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    const customer=await this.findOne(id);
    return this.CustomerRepository.remove(customer); `This action removes a #${id} customer`;
  }
}
