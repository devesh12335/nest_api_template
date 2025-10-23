import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('fcm_tokens')
  export class FcmToken {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    token: string;
  
    @ManyToOne(() => User, (user) => user, { onDelete: 'CASCADE' })
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  