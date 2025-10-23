import { ChildFeature } from 'src/property_features/entities/child_feature.entity';
import { PropertyImage } from 'src/property_image/entities/property_image.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 255, nullable: true })
  short_description: string;

  @Column('text')
  description: string;

   @Column({ length: 255, nullable: true })
  lat: string;

   @Column({ length: 255, nullable: true })
  long: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column('text')
  address: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating: number; // e.g., 4.5

  @Column({ type: 'time', nullable: true })
  check_in: string; // e.g., "15:00"

  @Column({ type: 'time', nullable: true })
  check_out: string; // e.g., "11:00"

  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 10, nullable: true })
  zip_code: string;

  @Column('text', { nullable: true })
  policies: string; 

  @OneToMany(() => PropertyImage, (image) => image.hotel)
  images: PropertyImage[];

  // Many Properties can have Many ChildFeatures
  @ManyToMany(() => ChildFeature, { cascade: true })
  @JoinTable({
    name: 'property_selected_child_features', // Intermediate table name
    joinColumn: { name: 'propertyId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'childFeatureId', referencedColumnName: 'id' },
  })
  selectedFeatures: ChildFeature[];
}