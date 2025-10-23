import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/countries/entities/country.entity';
import { State } from 'src/states/entities/state.entity';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the zone', example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The name of the zone', example: 'Europe' })
  name: string;

  @Column({ default: true })
  @ApiProperty({
    description: 'Status indicating if the zone is active',
    example: true,
  })
  is_active: boolean;

  @OneToMany(() => Country, (country) => country.zone)
    @ApiProperty({
      description: 'List of countries belonging to this zone',
      type: [Country], // Swagger type for array of State entities
      nullable: true,
    })
    countries: Country[];

     @OneToMany(() => State, (state) => state.zone)
    @ApiProperty({
      description: 'List of countries belonging to this zone',
      type: [State], // Swagger type for array of State entities
      nullable: true,
    })
    states: State[];
}