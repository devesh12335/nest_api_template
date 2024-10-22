import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private jwtService: JwtService,

    private readonly passwordService: PasswordService
  ) {}
  

  async signIn(
    email: string,
    pass: string,
  ) {
    const user = await this.usersService.findOneByEmail(email);
    if(user == null){
      throw 'User Not Found';
    }
    const isMatch = await this.passwordService.comparePassword(pass, user?.password);

    if (isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user:user
    };
  }
}
