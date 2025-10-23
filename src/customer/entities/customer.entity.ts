import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity('customers')
export class Customer {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example:'Mr.' })
  @Column({length:20})
  social_title: string;

  @ApiProperty({ example: 'John' })
  @Column()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @Column()
  last_name: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '+911234567890', required: false })
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({ example: 'securepassword123' })
  @Column()
  password: string;

  @ApiProperty({ example: '1995-05-10', required: false })
  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @ApiProperty({ example: true })
  @Column({ default: true })
  enabled: boolean;

  @ApiProperty({ example: false })
  @Column({ default: false })
  newsletter: boolean;

  @ApiProperty({ example: false })
  @Column({ default: false })
  opt_in: boolean;
}
