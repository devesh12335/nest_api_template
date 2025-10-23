// property_images/entities/property_image.entity.ts
import { Property } from 'src/property/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('property_image')
export class PropertyImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  hotel_id: number; // Foreign key column

  @Column({ length: 2048 }) // URL links can be long
  img_link: string;

  // Define the Many-to-One relationship back to the Hotel
  @ManyToOne(() => Property, (property) => property.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotel_id' }) // Specifies the foreign key column name
  hotel: Property;
}