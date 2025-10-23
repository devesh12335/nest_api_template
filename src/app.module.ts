import { Module } from '@nestjs/common';
import {  FirebaseAdminModule } from '@alpha018/nestjs-firebase-auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


import { FileModule } from './file/file.module';

import { UploadedFile } from './file/entities/file.entity';

import { NotificationsModule } from './notifications/notifications.module';
import { FcmTokenModule } from './fcm_token/fcm_token.module';

import * as admin from 'firebase-admin';
import { RedisModule } from './redis/redis.module';

import * as dotenv from 'dotenv';
import { FirebaseAuthModule } from './firebase_auth/firebase_auth.module';


dotenv.config();

@Module({
  imports: [
    RedisModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // Change these based on your PostgreSQL setup
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER, // Replace with your PostgreSQL username
      password: process.env.DB_PASSWORD, // Replace with your PostgreSQL password
      database: process.env.DB_DATABASE, // Replace with your PostgreSQL database name
      entities: [ UploadedFile],
      synchronize: process.env.RUN_MIGRATIONS === 'true', // Only for development; disable in production
      autoLoadEntities: true,
      logging: true, // Useful for debugging
      
    }),


    // Firebase Authentication setup
    ConfigModule.forRoot({isGlobal: true}),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // base64: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
        options: {
          credential: admin.credential.cert('config/cred.json'),
      // storageBucket: 'gs://aaag-the-fire.firebasestorage.app', 
        }, // Optionally, provide Firebase configuration here
        auth: {
          config: {
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the header
            checkRevoked: true, // Optionally check if the token is revoked
             ignoreEmailVerification: true, 
            validateRole: true, // Enable role validation if needed
            // useLocalRoles: true, // Set to true if you want to validate user roles locally without firebase call
            //   rolesClaimKey: 'user_roles' // Set the name of the key within the Firebase custom claims that stores user roles
          },
        },
      }),
      inject: [ConfigService],
    }),


    
    // FileModule, //Enable when file storage needed
    NotificationsModule,
    FcmTokenModule,
    FirebaseAuthModule,
    FileModule
    
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // admin.initializeApp({
      // credential: admin.credential.cert('config/cred.json'),
    // //   storageBucket: 'gs://aaag-the-fire.firebasestorage.app', // Replace with your storage bucket
    // });
  }
}
