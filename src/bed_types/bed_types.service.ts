import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBedTypeDto } from './dto/create-bed_type.dto';
import { UpdateBedTypeDto } from './dto/update-bed_type.dto';
import { BedType } from './entities/bed_type.entity';

// Note: You would also need to inject/use the RoomTypeRepository
// to handle the association in a real-world application.

@Injectable()
export class BedTypeService {
  constructor(
    @InjectRepository(BedType)
    private bedTypeRepository: Repository<BedType>,
  ) {}

  // **C**reate
  async create(createBedTypeDto: CreateBedTypeDto): Promise<BedType> {
    // In a full implementation, you would check createBedTypeDto.roomTypeIds
    // and fetch/associate the RoomType entities here.
    const newBedType = this.bedTypeRepository.create(createBedTypeDto);
    return this.bedTypeRepository.save(newBedType);
  }

  // **R**ead All
  findAll(): Promise<BedType[]> {
    return this.bedTypeRepository.find({ relations: ['roomTypes'] });
  }

  // **R**ead One
  async findOne(id: number): Promise<BedType> {
    const bedType = await this.bedTypeRepository.findOne({
      where: { id },
      relations: ['roomTypes'],
    });
    if (!bedType) {
      throw new NotFoundException(`BedType with ID ${id} not found.`);
    }
    return bedType;
  }

  // **U**pdate
  async update(id: number, updateBedTypeDto: UpdateBedTypeDto): Promise<BedType> {
    await this.bedTypeRepository.update(id, updateBedTypeDto);
    // Fetch and return the updated entity
    return this.findOne(id);
  }

  // **D**elete
  async remove(id: number): Promise<void> {
    const result = await this.bedTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`BedType with ID ${id} not found.`);
    }
  }
}