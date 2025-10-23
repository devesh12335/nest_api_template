import { ApiProperty } from '@nestjs/swagger';
import { State } from 'src/states/entities/state.entity';
import { Zone } from 'src/zones/entities/zone.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number; // integer primary key

  @Column({ length: 255 })
  country: string; // Country name

  @Column({ length: 3, unique: true })
  iso_code: string; // e.g., 'USA' or 'IND'

  @Column({ length: 10, nullable: true })
  phone_prefix: string; // e.g., '+1' or '+91'

  @Column({ type: 'int' })
  currency_id: number; // Foreign key to Currency entity

  @Column({ type: 'int' })
  zone_id: number; // Foreign key to Zone entity

  @Column({ length: 50, nullable: true })
  postal_code: string; // e.g., regex for validation

  @Column({ type: 'boolean', default: false })
  is_tax_label: boolean; // Boolean flag

  @Column({ type: 'int', nullable: true })
  tax_id: number; // Foreign key to Tax entity

  // Custom column to simulate an 'active/inactive' status based on 'is_tax_label' for the filter
  // In a real scenario, you'd likely have a dedicated 'is_active' column.
  // For this example, let's assume active countries have tax labels.
  @Column({ type: 'boolean', default: true }) 
  is_active: boolean; 

  @OneToMany(() => State, (state) => state.country)
  @ApiProperty({
    description: 'List of states/provinces belonging to this country',
    type: [State], // Swagger type for array of State entities
    nullable: true,
  })
  states: State[];

    @ManyToOne(() => Zone, (zone) => zone.countries, {
      onDelete: 'CASCADE', // Optional: If country is deleted, related states are also deleted
    })
    @JoinColumn({ name: 'zone_id' }) // Explicitly links the relation to the country_id column
    @ApiProperty({
      description: 'Parent country object (loaded when relation is joined)',
      type: () => Zone, // Swagger type for the related object
    })
    zone: Zone;
}