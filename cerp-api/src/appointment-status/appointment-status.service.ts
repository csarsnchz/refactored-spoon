import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAppointmentStatusDto } from './dto/appointment-status.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';

@Injectable()
export class AppointmentStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async createAppointmentStatus(createAppointmentStatusDto: CreateAppointmentStatusDto) {
    return await this.prisma.appointmentStatus.create({
      data: createAppointmentStatusDto,
    });
  }

  async getAppointmentStatus(statusId: number) {
    return await this.prisma.appointmentStatus.findUnique({ where: { statusId: statusId } });
  }

  async getAllAppointmentStatuses() {
    return await this.prisma.appointmentStatus.findMany();
  }

  async updateAppointmentStatus(
    statusId: number,
    updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ) {
    return await this.prisma.appointmentStatus.update({
      where: { statusId: statusId },
      data: updateAppointmentStatusDto,
    });
  }

  async deleteAppointmentStatus(statusId: number) {
    await this.prisma.appointmentStatus.delete({ where: { statusId: statusId } });
  }
}
