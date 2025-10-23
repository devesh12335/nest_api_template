import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { LoginSessionService } from './login.session.service';
import { Request } from 'express';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import Redis from 'ioredis';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private jwtService: JwtService,

    private readonly passwordService: PasswordService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
        
    @Inject(forwardRef(() => LoginSessionService))
    private readonly loginService: LoginSessionService,

     @Inject('REDIS_CLIENT') private redis: Redis
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
    const login = this.loginService.login(req,user?.email);

     //remove all fcm tokens from redis
    // await this.redis.del('fcm_tokens_with_users');

    // const payload = { sub: user.id, email: user.email };
    return {
      // access_token: await this.jwtService.signAsync(payload,{expiresIn:'1h'}),
      token:await this.generateTokens(user.id),
      user:user,
      login
    };
  }

  async generateTokens(userId: number) {
    const user = await this.usersService.findOne(userId);
    console.log("User "+user);
    const payload = { user };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30d',    // Access token expiry
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',     // Refresh token expiry
    });

    this.usersService.updateRefreshToken(userId,refreshToken);

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
      throw new UnauthorizedException('Invalid refresh token '+error);
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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    const { email } = forgotPasswordDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    // Generate a reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token valid for 1 hour

    // Update user with reset token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    // await this.usersService.updateForForgotPassword(user.id, user);
    // Update user with reset token and expiry
  await this.userRepository.update(user.id, {
    resetPasswordToken: resetToken,
    resetPasswordExpires: resetTokenExpiry,
  });

    // Send email with the reset token (Use Nodemailer or a similar library)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Change as per your email provider
      auth: {
        user: '',
        pass: '',
      },
    });

     // HTML email template
     const emailTemplate = `
     <!DOCTYPE html>
     <html>
     <head>
       <meta charset="UTF-8">
       <title>Reset Password</title>
       <style>
         body {
           font-family: Arial, sans-serif;
           background-color: #f4f4f4;
           padding: 20px;
         }
         .container {
           max-width: 600px;
           margin: auto;
           background: #ffffff;
           border-radius: 8px;
           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
           overflow: hidden;
         }
         .header {
           background-color: #007bff;
           color: white;
           text-align: center;
           padding: 20px;
         }
         .content {
           padding: 20px;
         }
         .button {
           text-align: center;
           margin: 20px 0;
         }
         .button a {
           background-color: #007bff;
           color: white;
           padding: 15px 30px;
           text-decoration: none;
           border-radius: 5px;
           font-weight: bold;
         }
         .footer {
           text-align: center;
           font-size: 12px;
           color: #777;
           margin-top: 20px;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <div class="header">
           <h1>Reset Your Password</h1>
         </div>
         <div class="content">
           <p>Hi Devesh,</p> // Change the name as per the user
           <p>You requested to reset your password. Please click the button below:</p>
           <div class="button">
             <a href="www.crazygames.com" target="_blank">Reset Password</a> // Change the link
           </div>
           <p>If you didn’t request this, you can ignore this email.</p>
         </div>
         <div class="footer">
           <p>If the button doesn’t work, copy and paste this link into your browser:</p>
           <p>Reset PassWord</p> // Change the link
         </div>
       </div>
     </body>
     </html>
   `;
    const mailOptions = {
      from: '',
      to: user.email,
      subject: 'Password Reset Request',
   html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    return 'Password reset email sent successfully.';
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { token, newPassword } = resetPasswordDto;
    const user = await this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });

    if (!user) {
      throw new NotFoundException('Invalid or expired reset token.');
    }

    // Check if the token has expired
    if (new Date() > user.resetPasswordExpires) {
      throw new BadRequestException('Reset token has expired.');
    }

    // Update the user's password
    user.password = newPassword; // You should hash the password before saving
    user.resetPasswordToken = null; // Invalidate the reset token
    user.resetPasswordExpires = null; // Clear expiration
    await this.userRepository.save(user);

    return 'Password reset successfully.';
  }
}
