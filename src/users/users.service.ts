
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordService } from 'src/auth/password.service';
import { AuthService } from 'src/auth/auth.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    
    private readonly passwordService: PasswordService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService

  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
      createUserDto.password = hashedPassword;
    const user = this.userRepository.create(createUserDto);
    const userData =await this.userRepository.save(user);
    if(user == null){
      throw 'User Creation Failed';
    }

    const token = await this.authService.signIn(user.email,createUserDto.password);
    

    return {jwtToken:token}
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
  
  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
