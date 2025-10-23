
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordService } from 'src/auth/password.service';
import { AuthService } from 'src/auth/auth.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RefreshToken } from './entities/refresh.entity';
import { CreateRefreshTokenDto, UpdateRefreshDto } from './dto/refresh.dto';
import { Role } from './entities/role.entity';
import Redis from 'ioredis';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,

    @InjectRepository(Role)
     private roleRepository: Repository<Role>,

    
    private readonly passwordService: PasswordService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

     @Inject('REDIS_CLIENT') private redis: Redis

  ) {}

  async create(createUserDto: CreateUserDto,req:Request) {
    const plainPass = createUserDto.password;
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;
      const roles = await this.roleRepository.find({
        where: { id: In(createUserDto.roleIds) },
      });
      const user = this.userRepository.create({
      ...createUserDto,
      roles,
    });
    const data = await this.userRepository.save(user);
    if(data == null){
      throw 'User Creation Failed';
    }
    // this.updateRefreshToken(userData.id,null);
    const token = await this.authService.signIn(user.email,plainPass,req);
    //remove all fcm tokens from redis
    // await this.redis.del('fcm_tokens_with_users');
    
    return {jwtToken:token}
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
  findAllUsersByRoles(roleId:Number): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] ,where: { roles: { id: In([roleId]) } } });
  }

  async findOne(id: number) {
    const data= await this.userRepository.findOne({ where: { id },relations: ['roles'] });
    return data;
  }
  
  findOneRefreshToken(id: number) {
    return this.refreshTokenRepository.findOne({ where: { user_id:id } });
  }
  


  
  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations: ['roles'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  } 
  
  async updateForForgotPassword(id: number, updateUserDto: User): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }
  
  async updateRefreshToken(id: number, refreshToken: string): Promise<User> {
    const dto = new UpdateRefreshDto();
  dto.refresh_token = refreshToken;
  dto.user_id = id;

  // Check if a refresh token exists for this user ID
  const token = await this.refreshTokenRepository.findOne({ where: { user_id: id } });

  if (token) {
    // Update existing token
    const result = await this.refreshTokenRepository.update({ user_id: id }, dto);
    if (result.affected === 0) {
      throw new Error('Update failed');
    }
  } else {
    // Save a new token if it doesn't exist
    await this.refreshTokenRepository.save(this.refreshTokenRepository.create(dto));
  }

  return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
