import { RoomType } from 'src/room_type/entities/room_type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class BedType {
  @PrimaryGeneratedColumn()
  id: number; // Primary key (integer)

  @Column({ unique: true })
  bed_type_name: string; // The name of the bed (e.g., 'King', 'Queen')

  @Column('decimal', { precision: 5, scale: 2 })
  width: number; // Width of the bed (e.g., in meters or feet)

  @Column('decimal', { precision: 5, scale: 2 })
  length: number; // Length of the bed (e.g., in meters or feet)

  // Many-to-Many relationship with RoomType
  @ManyToMany(() => RoomType, (roomType) => roomType.bedTypes)
  @JoinTable({
    name: 'room_type_bed_type', // Custom junction table name
    joinColumn: { name: 'bed_type_id' },
    inverseJoinColumn: { name: 'room_type_id' },
  })
  roomTypes: RoomType[];
}