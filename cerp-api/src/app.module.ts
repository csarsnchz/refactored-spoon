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

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, MailModule, CatologModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, CatologService],
})
export class AppModule {}
