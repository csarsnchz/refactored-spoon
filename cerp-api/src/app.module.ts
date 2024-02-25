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
import { NotificationsModule } from './notifications/notifications.module';
import { TenantsModule } from './tenants/tenants.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ProfessionalModule } from './professional/professional.module';
import { AppointmentService } from './appointment/appointment.service';
import { ProfessionalService } from './professional/professional.service';
import { NotificationsService } from './notifications/notifications.service';
import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';
import { ServiceModule } from './services/services.module';
import { SpecializationModule } from './specialization/specialization.module';
import { AppointmentStatusModule } from './appointment-status/appointment-status.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, MailModule, CatologModule, NotificationsModule, TenantsModule, AppointmentModule, ProfessionalModule, ServiceModule, SpecializationModule, AppointmentStatusModule],
  controllers: [AppController, ServicesController],
  providers: [AppService, PrismaService, CatologService, AppointmentService, ProfessionalService, NotificationsService, ServicesService],
})
export class AppModule {}
