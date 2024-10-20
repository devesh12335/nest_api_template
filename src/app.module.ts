import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
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
      entities: [Product],
      synchronize: true,         // Only for development; disable in production
    }),
    ProductsModule,
  

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
