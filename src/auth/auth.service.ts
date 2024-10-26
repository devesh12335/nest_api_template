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

    // const payload = { sub: user.id, email: user.email };
    return {
      // access_token: await this.jwtService.signAsync(payload,{expiresIn:'1h'}),
      token:await this.generateTokens(user.id),
      user:user,
      login
    };
  }

  async generateTokens(userId: number) {
    const payload = { userId };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',    // Access token expiry
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',     // Refresh token expiry
    });

    return { accessToken, refreshToken };
  }


  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.usersService.findOneRefreshToken(payload.userId);

      if (user && user.refresh_token === refreshToken) {
        const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user.id);
        await this.updateRefreshToken(user.id, newRefreshToken);

        return { accessToken, refreshToken: newRefreshToken };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersService.updateRefreshToken(userId, refreshToken);
  }


  async logout(req:Request,userId:number){
    await this.updateRefreshToken(userId, null);

    return this.loginService.logout(req);
  } 
  
  isLoggedIn(req:Request){
    return this.loginService.isLoggedIn(req);
  }
}
