import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('uploaded_files')
export class UploadedFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column('int')
  size: number;
}
