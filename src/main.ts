import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as session from 'express-session';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(getProjectName())
    .setDescription('All Apis ')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

   // Use session middleware
   app.use(
    session({
      
      secret: process.env.SESSION_SECRET,   // Change this to a secure random string
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },  // Set secure: true if using HTTPS
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//read project name
 function getProjectName(): string {
  const packageJsonPath = './package.json';
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return packageJson.name;
}