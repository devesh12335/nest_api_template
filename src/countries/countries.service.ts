import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const newCountry = this.countriesRepository.create(createCountryDto);
    return this.countriesRepository.save(newCountry);
  }

  async findAll(status: boolean | 'both'): Promise<Country[]> {
    const whereCondition = status === 'both' ? {} : { is_active: status };
    
    return this.countriesRepository.find({
      where: whereCondition,
      relations:['zone']
    });
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countriesRepository.findOne({ where: { id },relations:['zone'] });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found.`);
    }
    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto): Promise<Country> {
    const country = await this.findOne(id); // Use findOne to check existence
    const updatedCountry = Object.assign(country, updateCountryDto);
    return this.countriesRepository.save(updatedCountry);
  }

  async remove(id: number): Promise<void> {
    const result = await this.countriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Country with ID ${id} not found.`);
    }
  }
}