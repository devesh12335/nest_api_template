import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('contacts')
export class contacts {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Mr', required: false, description: 'Title of the contact' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @ApiProperty({ example: 'Max23@gmail.com', required: false, description: 'Email address of the contact' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @ApiProperty({ example: true, description: 'Whether to save messages or not' })
  @Column({ type: 'boolean', default: false })
  saveMessages: boolean;

  @ApiProperty({ example: 'This is a description', required: false, description: 'Additional notes or description' })
  @Column({ type: 'text', nullable: true })
  description?: string;
}
