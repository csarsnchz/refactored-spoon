import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { LogsService } from 'src/logs/logs.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports: [MailModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, LogsService, NotificationsService, PrismaService, JwtService],
})
export class AuthModule {}
