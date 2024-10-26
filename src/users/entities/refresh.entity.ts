import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('refreshToken')
@Unique(['user_id'])
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true, nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 'max', nullable:true })
  refresh_token: string;
}
