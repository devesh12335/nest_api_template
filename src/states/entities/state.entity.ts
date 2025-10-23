import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/countries/entities/country.entity';
import { Zone } from 'src/zones/entities/zone.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier of the state',
    example: 1,
    type: 'integer',
  })
  id: number;

  @Column({ unique: true, length: 3 })
  @ApiProperty({
    description: 'ISO code of the state (e.g., "MH" for Maharashtra)',
    example: 'MH',
    maxLength: 3,
  })
  iso_code: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'Full name of the state',
    example: 'Maharashtra',
    maxLength: 100,
  })
  name: string;

  @Column('integer')
  @ApiProperty({
    description: 'Foreign key reference to the parent country',
    example: 101,
    type: 'integer',
  })
  country_id: number;

  @Column('integer', { nullable: true })
  @ApiProperty({
    description: 'Foreign key reference to a geographical zone (optional)',
    example: 5,
    type: 'integer',
    nullable: true,
  })
  zone_id: number | null;

  @Column({ default: true })
  @ApiProperty({
    description: 'Status of the state (active/inactive)',
    example: true,
    type: 'boolean',
  })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Country, (country) => country.states, {
    onDelete: 'CASCADE', // Optional: If country is deleted, related states are also deleted
  })
  @JoinColumn({ name: 'country_id' }) // Explicitly links the relation to the country_id column
  @ApiProperty({
    description: 'Parent country object (loaded when relation is joined)',
    type: () => Country, // Swagger type for the related object
  })
  country: Country;

  @ManyToOne(() => Zone, (zone) => zone.states, {
    onDelete: 'CASCADE', // Optional: If country is deleted, related states are also deleted
  })
  @JoinColumn({ name: 'zone_id' }) // Explicitly links the relation to the country_id column
  @ApiProperty({
    description: 'Parent country object (loaded when relation is joined)',
    type: () => Zone, // Swagger type for the related object
  })
  zone: Zone;
}