import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateZoneDto } from './dto/create-zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private zonesRepository: Repository<Zone>,
  ) {}

  /**
   * Fetches all zones where is_active is true.
   */
  async findAll(): Promise<Zone[]> {
    return this.zonesRepository.find({
      where: { is_active: true }, // IMPORTANT: Fetches only active zones
      relations:['countries','states']
    });
  }

  async findOne(id: number): Promise<Zone> {
    const zone = await this.zonesRepository.findOne({ where: { id },relations:['countries','states'] });
    if (!zone) {
      throw new NotFoundException(`Zone with ID ${id} not found.`);
    }
    return zone;
  }

  async create(createZoneDto: CreateZoneDto): Promise<Zone> {
    try{
    const newZone = this.zonesRepository.create(createZoneDto);
    return this.zonesRepository.save(newZone);
      }catch(e){
        return e;
    }
  }

  async update(id: number, updateZoneDto: CreateZoneDto): Promise<Zone> {
    await this.zonesRepository.update(id, updateZoneDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.zonesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Zone with ID ${id} not found.`);
    }
  }
}