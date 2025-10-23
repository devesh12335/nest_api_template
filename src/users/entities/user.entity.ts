

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  contactNo: string;


  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'text', nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  authId: string; // Changed to camelCase for consistency in code

  @Column({ type: 'varchar', nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  // @UpdateDateColumn()
  // refresh_token: string;
  
  @Column({ type: 'text', nullable: true })
  delivery_partner_status: string; // Changed to camelCase for consistency in code

  @ManyToMany(() => Role, (role) => role, { cascade: true })
  @JoinTable() // This creates the join table for the many-to-many relationship
  roles: Role[];
}
