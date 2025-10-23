import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async create(dto: CreateAddressDto): Promise<Address> {
    const customer = await this.customerRepo.findOne({ where: {id: dto.customerId}  });
    if (!customer) throw new NotFoundException('Customer not found');

    const address = this.addressRepo.create({
      ...dto,
      customer,
    });

    return this.addressRepo.save(address);
  }

  async findAll(): Promise<Address[]> {
    return this.addressRepo.find();
  }

  async findOne(id: number): Promise<Address> {
    const addr = await this.addressRepo.findOne({ where: { id } });
    if (!addr) throw new NotFoundException('Address not found');
    return addr;
  }

  async update(id: number, dto: UpdateAddressDto): Promise<Address> {
    const addr = await this.findOne(id);
    Object.assign(addr, dto);
    return this.addressRepo.save(addr);
  }

  async remove(id: number): Promise<void> {
    const addr = await this.findOne(id);
    await this.addressRepo.remove(addr);
  }
}
