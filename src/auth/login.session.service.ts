import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/users/users.service';

@Injectable()
export class LoginSessionService {
  constructor(
    private jwtService: JwtService,

    private readonly userService: UserService

  ){}
  // Log in the user and create a session
  login(req: Request, username: string): string {
    if (!req.session) {
      return 'Session not initialized';
    }
    
    req.session.username = username; // Store username in session
    return `User ${username} logged in successfully`;
  }

  // Log out the user and destroy the session
  logout(req: Request): string {
    if (!req.session) {
      return 'Session not initialized';
    }
    
    req.session.destroy((err) => {
      if (err) {
        return 'Failed to destroy session';
      }
    });
    
    return 'User logged out successfully';
  }

  // Check if user is logged in
  async isLoggedIn(req: Request) {
    if (req.session && req.session.username) {
      const user = await this.userService.findOneByEmail(req.session.username);
      const payload = { sub: user.id, email: user.email };
      
     const access_token =  await this.jwtService.signAsync(payload,{expiresIn:'1h'});

      return {
        message: `User ${req.session.username} is logged in`,
        status:200,
        access_token:access_token,
        user: user
      };
    }
    
    return {
      message: `User ${req.session.username} Not Found`,
      status:400,
      user: null
    };
  }
}
