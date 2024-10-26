


import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
require('dotenv').config();

export const jwtConstants = {
    secret: process.env.JWT_SECRET,
  };
  