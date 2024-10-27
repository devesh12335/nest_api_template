import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Auth } from './auth/entities/auth.entity';
import { FileModule } from './file/file.module';
require('dotenv').config();



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,         // Change these based on your PostgreSQL setup
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,  // Replace with your PostgreSQL username
      password:process.env.DB_PASSWORD,  // Replace with your PostgreSQL password
      database: process.env.DB_DATABASE,  // Replace with your PostgreSQL database name
      entities: [
        Product,
        User,
        Auth
      ],
      synchronize: true,         // Only for development; disable in production
      autoLoadEntities: true,
    }),
    ProductsModule,
    AuthModule,
    UsersModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
