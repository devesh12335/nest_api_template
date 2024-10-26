import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RefreshToken } from './entities/refresh.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User,RefreshToken]),forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  
})
export class UsersModule {}
