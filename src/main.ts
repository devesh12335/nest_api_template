import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as session from 'express-session';
import { json, urlencoded } from 'express';
import * as cors from 'cors';
import { QueryFailedFilter } from './common/filters/query-failed.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { EntityNotFoundFilter } from './common/filters/entity-not-found.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
require('dotenv').config();

async function bootstrap() {

  console.log('ENV USER:', process.env.DB_USER);
console.log('ENV PASS:', process.env.DB_PASSWORD);

  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  
  app.useGlobalFilters(
    new EntityNotFoundFilter(), // Catches TypeORM EntityNotFoundError -> 404
    new QueryFailedFilter(), // Catches TypeORM QueryFailedError (e.g., 23505 unique) -> 409
    new HttpExceptionFilter(), // Catches all standard NestJS HttpExceptions (including ValidationPipe's BadRequestException));//Exception filter registred
    new AllExceptionsFilter(), // 4. CATCH-ALL: Catches everything else (uncaught runtime errors) -> 500
  )
  const config = new DocumentBuilder()
    .setTitle(getProjectName())
    .setDescription('All Apis ')
    .setVersion('1.0')
    .setTitle('New Project')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional, for documentation purposes
      },
      'bearerAuth', // This is the name of the security scheme
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

   // Use session middleware
  //  app.use(
  //   session({
      
  //     secret: 'ayush',   // Change this to a secure random string
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { secure: false },  // Set secure: true if using HTTPS
  //   }),
  // );

    // Enable CORS
  app.enableCors({
    // origin: ['http://0.0.0.0','*'], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    // credentials: true, // Allow cookies to be sent
     allowedHeaders: 'Content-Type, Accept, Authorization', // The Authorization header is crucial for sending your Firebase token!
 
  });
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

//read project name
 function getProjectName(): string {
  const packageJsonPath = './package.json';
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return packageJson.name;
}