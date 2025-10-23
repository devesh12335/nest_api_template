import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {  MultipleDeviceNotificationDto, NotificationDto, TopicNotificationDto } from './dto/create-notification.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants';

@ApiTags("notifications")
@ApiBearerAuth('bearerAuth')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Public()
  @Post("send-notification")
  @ApiOperation({ summary: "Send a push notification to a single device" })
  @ApiResponse({ status: 200, description: "Notification sent successfully" })
  async sendNotification(
    @Body() body: NotificationDto
  ) {
    return this.notificationsService.sendNotification({
      token: body.token,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }

  @Public()
  @Post("send-multiple-notifications")
  @ApiOperation({ summary: "Send push notifications to multiple devices" })
  @ApiResponse({ status: 200, description: "Notifications sent successfully" })
  async sendMultipleNotifications(@Body() body: MultipleDeviceNotificationDto) {
    return this.notificationsService.sendNotificationToMultipleTokens({
      tokens: body.tokens,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }

  @Post("send-topic-notification")
  @ApiOperation({ summary: "Send a push notification to a topic" })
  @ApiResponse({
    status: 200,
    description: "Topic notification sent successfully",
  })
  async sendTopicNotification(@Body() body: TopicNotificationDto) {
    return this.notificationsService.sendTopicNotification({
      topic: body.topic,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }
}
