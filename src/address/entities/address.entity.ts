import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from 'src/customer/entities/customer.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example:1, description:'Address unique ID (auto-incremented)'})
  id: number;

  
  @Column({ nullable: true })
  @ApiProperty({ example: 'Identification Number', required: false })
  identificationNumber?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Alias for the address (e.g., Home, Office)', required: false })
  alias?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'First Name', required: false })
  firstName?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Last Name', required: false })
  lastName?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Company name', required: false })
  company?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'VAT number', required: false })
  vatNumber?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Address line 1', required: false })
  address1?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Address line 2', required: false })
  address2?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Zip / Postal Code', required: false })
  zipCode?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'City', required: false })
  city?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Country', required: false })
  country?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'State / Province', required: false })
  state?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Home phone', required: false })
  homePhone?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Mobile phone', required: false })
  mobilePhone?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Other contact details', required: false })
  other?: string;

  // Relation with Customer (1:1)
  @OneToOne(() => Customer, { eager: true, cascade: true })
  @JoinColumn()
  @ApiProperty({ example: 'Associated customer (One to One)' })
  customer: Customer;
}
