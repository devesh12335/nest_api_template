import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';


@Unique(['user_id'])
@Entity('refreshToken')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true, nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 255, nullable:true })
  refresh_token: string;
}
