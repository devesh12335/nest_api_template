import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { LoginSessionService } from './login.session.service';
import { Request } from 'express';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private jwtService: JwtService,

    private readonly passwordService: PasswordService,
    private readonly loginService: LoginSessionService,
  ) {}
  

  async signIn(
    email: string,
    pass: string,
    req: Request
  ) {
    const user = await this.usersService.findOneByEmail(email);
    if(user == null){
      throw 'User Not Found';
    }
    const isMatch = await this.passwordService.comparePassword(pass, user?.password);
      console.log("Is Match " + isMatch + pass + user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    //Initialize Login Session
    const login = await this.loginService.login(req,user?.email);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user:user,
      login
    };
  }

  logout(req:Request){
    return this.loginService.logout(req);
  } 
  
  isLoggedIn(req:Request){
    return this.loginService.isLoggedIn(req);
  }
}
