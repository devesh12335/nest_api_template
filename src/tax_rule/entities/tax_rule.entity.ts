
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tax_rule')
export class TaxRule {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the tax rule', example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ description: 'Name of the tax rule', example: 'Standard VAT' })
  name: string;

  @Column({ default: true })
  @ApiProperty({
    description: 'Status of the tax rule (active/inactive)',
    example: true,
  })
  is_active?: boolean;
}