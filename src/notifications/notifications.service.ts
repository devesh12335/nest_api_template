import { Injectable } from '@nestjs/common';
import {  MultipleDeviceNotificationDto, NotificationDto, TopicNotificationDto } from './dto/create-notification.dto';
import * as admin from "firebase-admin";

@Injectable()
export class NotificationsService {
  async sendNotification({ token, title, body, icon }: NotificationDto) {
    try {
      
      const response = await admin.messaging().send({
        token,
        // webpush: {
          notification: {
            title,
            body,
            // icon,
          },
        // },
      });
      return response;
    } catch (error) {
      if (error.code === 'messaging/registration-token-not-registered') {
        console.warn('Unregistered token:', token);
        // Remove token from your database.
        return { success: false, message: "Unregistered Token" };

      }
      throw error;
    }
  }

  async sendNotificationToMultipleTokens({
    tokens,
    title,
    body,
    icon,
  }: MultipleDeviceNotificationDto) {
    console.log("tokens", tokens,icon,title,body);
    const message = {
      notification: {
        title,
        body,
        // image:icon,
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log("Successfully sent messages:", response);     
       console.log("Error sending messages:", response.responses);

      return {
        success: true,
        message: `Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`,
      };
    } catch (error) {
      if (error.code === 'messaging/registration-token-not-registered') {
        console.warn('Unregistered token:');
        // Remove token from your database.
        return { success: false, message: "Unregistered Token" };

      }
      console.log("Error sending messages:", error);
      return { success: false, message: "Failed to send notifications" };
    }
  }

  async sendTopicNotification({
    topic,
    title,
    body,
    icon,
  }: TopicNotificationDto) {
    const message = {
      notification: {
        title,
        body,
        icon,
      },
      topic,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Successfully sent message:", response);
      return { success: true, message: "Topic notification sent successfully" };
    } catch (error) {
      if (error.code === 'messaging/registration-token-not-registered') {
        console.warn('Unregistered token:');
        return { success: false, message: "Unregistered Token" };
        // Remove token from your database.
      }
      console.log("Error sending message:", error);
      return { success: false, message: "Failed to send topic notification" };
    }
  }
}
