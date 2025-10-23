import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ChildFeature } from "./child_feature.entity";

@Entity('property_features')
export class PropertyFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., 'In-Room Amenities', 'Hotel Services'

  @Column({ default: true })
  isActive: boolean;

  // One Feature (Parent) has many ChildFeatures
  @OneToMany(() => ChildFeature, (childFeature) => childFeature.parentFeature, {
    cascade: true, // Auto-save/delete child features
  })
  childFeatures: ChildFeature[];
}
