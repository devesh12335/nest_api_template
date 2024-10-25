import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './constants';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: CreateAuthDto, @Req() req: Request) {
    return this.authService.signIn(signInDto.email, signInDto.password,req);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return 'hi';
  }

  // Log out endpoint
  @Post('logout')
  logout(@Req() req: Request): string {
    return this.authService.logout(req);
  }

  // Check login status
  @Public()
  @Get('status')
  status(@Req() req: Request): string {
    return this.authService.isLoggedIn(req);
  }
}
