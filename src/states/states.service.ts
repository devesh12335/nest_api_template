import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateDto): Promise<State> {
    const newState = this.statesRepository.create(createStateDto);
    return this.statesRepository.save(newState);
  }

  findAll(): Promise<State[]> {
    return this.statesRepository.find({relations:['zone','country'] });
  }

  async findOne(id: number): Promise<State> {
    const state = await this.statesRepository.findOne({ where: { id },relations:['zone','country'] });
    if (!state) {
      throw new NotFoundException(`State with ID "${id}" not found.`);
    }
    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    const state = await this.findOne(id); // Reuses findOne to check existence
    await this.statesRepository.update(id, updateStateDto);
    // Fetch the updated entity to return
    return this.statesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.statesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`State with ID "${id}" not found.`);
    }
  }
}