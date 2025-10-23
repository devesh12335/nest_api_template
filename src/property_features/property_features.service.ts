import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyFeatureDto } from './dto/create-property_feature.dto';
import { UpdatePropertyFeatureDto } from './dto/update-property_feature.dto';
import { PropertyFeature } from './entities/property_feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Feature } from 'typeorm';

@Injectable()
export class PropertyFeaturesService {
  constructor(
    @InjectRepository(PropertyFeature)
    private featuresRepository: Repository<PropertyFeature>,
  ) {}

 // CREATE: Save Parent Feature and its Child Features
  async create(createFeatureDto: CreatePropertyFeatureDto): Promise<PropertyFeature> {
    const newFeature = this.featuresRepository.create(createFeatureDto);
    return this.featuresRepository.save(newFeature);
  }

  // READ: Find all features with their children
  findAll(): Promise<PropertyFeature[]> {
    return this.featuresRepository.find({ relations: ['childFeatures'] });
  }

  // READ: Find one feature by ID with its children
  async findOne(id: number): Promise<PropertyFeature> {
    const feature = await this.featuresRepository.findOne({
      where: { id },
      relations: ['childFeatures'],
    });
    if (!feature) {
      throw new NotFoundException(`Feature with ID "${id}" not found`);
    }
    return feature;
  }

  // UPDATE: Update a feature (simplified: assumes no complex child feature update logic here)
  async update(id: number, updateFeatureDto: UpdatePropertyFeatureDto): Promise<PropertyFeature> {
    await this.featuresRepository.update(id, updateFeatureDto);
    return this.findOne(id); // Return the updated entity
  }

  // DELETE: Remove a feature (and cascade delete its children)
  async remove(id: number): Promise<void> {
    const result = await this.featuresRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feature with ID "${id}" not found`);
    }
  }
}
