import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth-guard';
import { PasswordService } from './password.service';
import { LoginSessionService } from './login.session.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: false,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, 
  //   {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // },
  PasswordService,
  LoginSessionService
],
  exports:[PasswordService,AuthService]
}
)
export class AuthModule {}
