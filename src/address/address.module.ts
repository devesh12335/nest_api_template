import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entities/address.entity';
import { Customer } from 'src/customer/entities/customer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Address, Customer])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
