import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsDto } from './dto/notifications.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() notificationsDto: NotificationsDto) {
    return this.notificationsService.create(notificationsDto);
  }

  @UseGuards(JwtGuard)
  @Get(":idUser")
  fibndByUser(@Param('idUser') idUser: any) {
    return this.notificationsService.findByUser(idUser);
  }
}
