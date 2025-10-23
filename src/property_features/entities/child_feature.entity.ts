import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { PropertyFeature } from './property_feature.entity';
import { Property } from 'src/property/entities/property.entity';


@Entity('child_features')
export class ChildFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g., 'Free WiFi', 'Pool Access', '24-Hour Desk'

  @Column({ default: true })
  isAvailable: boolean;

  // Many ChildFeatures belong to one Feature (Parent)
  @ManyToOne(() => PropertyFeature, (feature) => feature.childFeatures, {
    onDelete: 'CASCADE', // Delete children if parent is deleted
  })
  @JoinColumn({ name: 'parentId' })
  parentFeature: PropertyFeature;

  @Column()
  parentId: number; // Foreign key column

  // Many ChildFeatures can be selected by Many Properties
  @ManyToMany(() => Property, (property) => property.selectedFeatures)
  properties: Property[];
}