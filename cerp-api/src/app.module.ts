import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { MailModule } from './mail/mail.module';
import { CatologService } from './catolog/catolog.service';
import { CatologModule } from './catolog/catolog.module';
import { LogsModule } from './logs/logs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, MailModule, CatologModule, LogsModule, NotificationsModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, CatologService],
})
export class AppModule {}
