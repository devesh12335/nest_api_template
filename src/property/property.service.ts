import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { ChildFeature } from 'src/property_features/entities/child_feature.entity';
import { UpdatePropertyFeaturesDto } from './dto/update-property_feature.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,

    @InjectRepository(ChildFeature)
    private childFeatureRepository: Repository<ChildFeature>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const { selectedChildFeatureIds, ...propertyData } = createPropertyDto;

    const newProperty = this.propertyRepository.create(propertyData);
    
    // Fetch and assign the selected features
    newProperty.selectedFeatures = await this.getChildFeaturesByIds(selectedChildFeatureIds);
    
    return this.propertyRepository.save(newProperty);
  }

  findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  async findOne(id: number): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      // Join to load selected features
      relations: ['selectedFeatures'], 
    });

    if (!property) {
      throw new NotFoundException(`Property with ID "${id}" not found`);
    }

    // Optionally load the parent feature for each selected child feature
    // This often requires a separate query or a view loader, but a simple solution is to eagerly load the parent
    // The ChildFeature entity needs 'parentFeature' to be eager loaded or added to relations array.
    
    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
   const property = await this.findOne(id); // Reuse findOne to check existence

    // Fetch the new list of features
    property.selectedFeatures = await this.getChildFeaturesByIds(updatePropertyDto.selectedChildFeatureIds);

    // Saving the property updates the many-to-many join table automatically
    return this.propertyRepository.save(property);
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.propertyRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Property with ID "${id}" not found.`);
    }

    return { deleted: true };
  }

  // Helper to fetch and validate Child Features by IDs
  private async getChildFeaturesByIds(ids: number[]): Promise<ChildFeature[]> {
    if (!ids || ids.length === 0) return [];
    
    const childFeatures = await this.childFeatureRepository.findBy({ id: In(ids) });

    if (childFeatures.length !== ids.length) {
      // Find missing IDs for a clear error message
      const foundIds = childFeatures.map(f => f.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`One or more Child Features not found: ${missingIds.join(', ')}`);
    }
    return childFeatures;
  }

  // UPDATE Selected Features for a Property
  async updateFeatures(propertyId: number, updateDto: UpdatePropertyFeaturesDto): Promise<Property> {
    const property = await this.findOne(propertyId); // Reuse findOne to check existence

    // Fetch the new list of features
    property.selectedFeatures = await this.getChildFeaturesByIds(updateDto.selectedChildFeatureIds);

    // Saving the property updates the many-to-many join table automatically
    return this.propertyRepository.save(property);
  }
}