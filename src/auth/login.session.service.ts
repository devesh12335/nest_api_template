import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoginSessionService {
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
  isLoggedIn(req: Request): string {
    if (req.session && req.session.username) {
      return `User ${req.session.username} is logged in`;
    }
    
    return 'User is not logged in';
  }
}
