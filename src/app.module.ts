import { Module } from '@nestjs/common';
import {  FirebaseAdminModule } from '@alpha018/nestjs-firebase-auth';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Auth } from './auth/entities/auth.entity';
import { FileModule } from './file/file.module';
import { RefreshToken } from './users/entities/refresh.entity';
import { UploadedFile } from './file/entities/file.entity';

import { Role } from './users/entities/role.entity';

import { NotificationsModule } from './notifications/notifications.module';
import { FcmTokenModule } from './fcm_token/fcm_token.module';

import * as admin from 'firebase-admin';
import { RedisModule } from './redis/redis.module';
import { FirebaseAuthModule } from './firebase_auth/firebase_auth.module';
import { PropertyModule } from './property/property.module';
import { PropertyImageModule } from './property_image/property_image.module';

import { CustomerModule } from './customer/customer.module';
import { PropertyFeaturesModule } from './property_features/property_features.module';
import { ZonesModule } from './zones/zones.module';
import { CountriesModule } from './countries/countries.module';

import { StatesModule } from './states/states.module';
import { TaxesModule } from './taxes/taxes.module';
import { TaxRuleModule } from './tax_rule/tax_rule.module';
import { RoomTypeModule } from './room_type/room_type.module';
import { RoomFeatureModule } from './room_feature/room_feature.module';
import * as dotenv from 'dotenv';
import { BedTypesModule } from './bed_types/bed_types.module';
import { AddressModule } from './address/address.module';
import { ContactModule } from './contact/contact.module';

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
      entities: [User, RefreshToken, UploadedFile, Role, Auth],
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

    AuthModule,
    UsersModule,
    // FileModule, //Enable when file storage needed
    NotificationsModule,
    FcmTokenModule,
    FirebaseAuthModule,
    PropertyModule,
    PropertyImageModule,

    CustomerModule,
    PropertyFeaturesModule,
    ZonesModule,
    CountriesModule,
    AddressModule,
    ContactModule,
    StatesModule,
    TaxesModule,
    TaxRuleModule,
    RoomTypeModule,
    BedTypesModule,
    RoomFeatureModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // admin.initializeApp({
    // //   credential: admin.credential.cert('config/cred.json'),
    // //   storageBucket: 'gs://aaag-the-fire.firebasestorage.app', // Replace with your storage bucket
    // });
  }
}
