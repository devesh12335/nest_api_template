import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax)
    private taxesRepository: Repository<Tax>,
  ) {}

  async create(createTaxDto: CreateTaxDto): Promise<Tax> {
    const tax = this.taxesRepository.create(createTaxDto);
    return this.taxesRepository.save(tax);
  }

  findAll(): Promise<Tax[]> {
    return this.taxesRepository.find();
  }

  async findOne(id: number): Promise<Tax> {
    const tax = await this.taxesRepository.findOne({ where: { id } });
    if (!tax) {
      throw new NotFoundException(`Tax with ID ${id} not found.`);
    }
    return tax;
  }

  async update(id: number, updateTaxDto: UpdateTaxDto): Promise<Tax> {
    const tax = await this.findOne(id); // Re-use findOne to check existence
    await this.taxesRepository.update(id, updateTaxDto);
    return this.taxesRepository.findOne({ where: { id } }); // Return updated entity
  }

  async remove(id: number): Promise<void> {
    const result = await this.taxesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tax with ID ${id} not found.`);
    }
  }
}