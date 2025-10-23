import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contacts } from './entities/contact.entity';

@Module({
  imports:[TypeOrmModule.forFeature([contacts])],
  controllers: [ContactController],
  providers: [ContactService],
  exports:[ContactService],
})
export class ContactModule {}
