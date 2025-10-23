import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FcmToken } from './entities/fcm_token.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateFcmTokenDto } from './dto/create-fcm_token.dto';
import { UpdateFcmTokenDto } from './dto/update-fcm_token.dto';
import Redis from 'ioredis';


@Injectable()
export class FcmTokenService {
  constructor(
    @InjectRepository(FcmToken)
    private readonly fcmTokenRepository: Repository<FcmToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject('REDIS_CLIENT') private redis: Redis
  ) {}

  async create(createFcmTokenDto: CreateFcmTokenDto): Promise<FcmToken> {
    const user = await this.userRepository.findOne({ where: { id: createFcmTokenDto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fcmToken = this.fcmTokenRepository.create({
      token: createFcmTokenDto.token,
      user,
    });

    return this.fcmTokenRepository.save(fcmToken);
  }

  async findAll(): Promise<FcmToken[]> {
      const cacheKey = 'fcm_tokens_with_users';
    const cached = await this.redis.get(cacheKey);

    if (cached) return JSON.parse(cached);

    const data = await this.fcmTokenRepository
      .createQueryBuilder('fcmToken')
      .leftJoinAndSelect('fcmToken.user', 'user')
      .select(['fcmToken.id', 'fcmToken.token', 'fcmToken.createdAt','fcmToken.updatedAt','user.id', 'user.email'])
      .getMany();

    await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 60);

    return data;
  }

  async findTokensByRoleId(roleId: number): Promise<string[]> {
    const tokens = await this.fcmTokenRepository.find({
      relations: ['user', 'user.roles'],
    });
  
    const filteredTokens = tokens
      .filter(token =>
        token.user.roles.some(role => role.id === roleId)
      )
      .map(token => token.token);
  
    return filteredTokens;
  }
  

  async findOne(id: number): Promise<FcmToken> {
    const fcmToken = await this.fcmTokenRepository.findOne({ where: { id }, relations: ['user'] });
    if (!fcmToken) {
      throw new NotFoundException('FCM Token not found');
    }
    return fcmToken;
  }

  async update(id: number, updateFcmTokenDto: UpdateFcmTokenDto): Promise<FcmToken> {
    const fcmToken = await this.findOne(id);

    Object.assign(fcmToken, updateFcmTokenDto);

    return this.fcmTokenRepository.save(fcmToken);
  }

  async remove(id: number): Promise<void> {
    const fcmToken = await this.findOne(id);
    await this.fcmTokenRepository.remove(fcmToken);
  }

  async findByUserId(userId: number): Promise<FcmToken[]> {
    return this.fcmTokenRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
