

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';


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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  

}
