import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { PrismaService } from 'src/prisma.service';
import { AppointmentController } from './appointment.controller';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService,PrismaService]
})
export class AppointmentModule {}
