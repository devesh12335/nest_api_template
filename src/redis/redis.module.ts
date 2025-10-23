// src/redis/redis.module.ts
import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global() // makes Redis available everywhere
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
       const client = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    
  });

  const info = await client.info('replication');
  console.log(info);  // Should show "role:master"

  return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
