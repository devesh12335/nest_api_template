import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('taxes')
export class Tax {
  @ApiProperty({
    description: 'Unique identifier for the tax record',
    example: 1,
    type: 'integer',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the tax (e.g., "VAT", "Sales Tax")',
    example: 'General Sales Tax (GST)',
    maxLength: 100,
  })
  @Column({ length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'Tax rate as a floating-point number (e.g., 0.18 for 18%)',
    example: 0.18,
    type: 'number',
    format: 'float',
  })
  @Column({ type: 'float' })
  rate: number;

  @ApiProperty({
    description: 'Indicates if the tax is currently in use',
    example: true,
    type: 'boolean',
  })
  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}