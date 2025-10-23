import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmToken } from './entities/fcm_token.entity';
import { User } from 'src/users/entities/user.entity';
import { FcmTokenController } from './fcm_token.controller';
import { FcmTokenService } from './fcm_token.service';




@Module({
  imports: [TypeOrmModule.forFeature([FcmToken, User])],
  controllers: [FcmTokenController],
  providers: [FcmTokenService],
  exports: [FcmTokenService,],
})
export class FcmTokenModule {}
