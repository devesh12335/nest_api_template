import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import * as admin from "firebase-admin";

require('dotenv').config();


@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {
  // constructor() {

  //   admin.initializeApp({
  //     credential: admin.credential.cert('config/cred.json'),
  //   });
  // }
}
