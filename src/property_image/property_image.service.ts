// property_images/property_image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyImage } from './entities/property_image.entity';
import { CreatePropertyImageDto } from './dto/create-property_image.dto';
import { UpdatePropertyImageDto } from './dto/update-property_image.dto';

@Injectable()
export class PropertyImageService {
  constructor(
    @InjectRepository(PropertyImage)
    private imageRepository: Repository<PropertyImage>,
  ) {}

  // CREATE
  async create(createPropertyImageDto: CreatePropertyImageDto): Promise<PropertyImage> {
    const newImage = this.imageRepository.create(createPropertyImageDto);
    return this.imageRepository.save(newImage);
  }

  // READ ALL (or by hotel_id)
  async findAll(hotelId?: number): Promise<PropertyImage[]> {
    if (hotelId) {
      return this.imageRepository.find({ where: { hotel_id: hotelId } });
    }
    return this.imageRepository.find();
  }

  // READ ONE
  async findOne(id: number): Promise<PropertyImage> {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Property image with ID "${id}" not found.`);
    }
    return image;
  }

  // UPDATE
  async update(id: number, updatePropertyImageDto: UpdatePropertyImageDto): Promise<PropertyImage> {
    const image = await this.findOne(id); // Uses findOne for error handling
    
    Object.assign(image, updatePropertyImageDto);

    return this.imageRepository.save(image);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Property image with ID "${id}" not found.`);
    }
  }
}