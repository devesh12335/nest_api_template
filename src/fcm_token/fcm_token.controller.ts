import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FcmTokenService } from './fcm_token.service';
import { CreateFcmTokenDto } from './dto/create-fcm_token.dto';
import { UpdateFcmTokenDto } from './dto/update-fcm_token.dto';


@ApiTags('FCM Tokens')
@ApiBearerAuth('bearerAuth')
@Controller('fcm-tokens')
export class FcmTokenController {
  constructor(private readonly fcmTokenService: FcmTokenService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new FCM token' })
  create(@Body() createFcmTokenDto: CreateFcmTokenDto) {
    return this.fcmTokenService.create(createFcmTokenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all FCM tokens' })
  findAll() {
    return this.fcmTokenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an FCM token by ID' })
  findOne(@Param('id') id: string) {
    return this.fcmTokenService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an FCM token by ID' })
  update(@Param('id') id: string, @Body() updateFcmTokenDto: UpdateFcmTokenDto) {
    return this.fcmTokenService.update(+id, updateFcmTokenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an FCM token by ID' })
  remove(@Param('id') id: string) {
    return this.fcmTokenService.remove(+id);
  }

  @Get('user/:userId')
@ApiOperation({ summary: 'Retrieve FCM tokens by user ID' })
findByUserId(@Param('userId') userId: string) {
  return this.fcmTokenService.findByUserId(+userId);
}
}
