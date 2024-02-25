import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppointmentStatusService } from './appointment-status.service';
import { CreateAppointmentStatusDto } from './dto/appointment-status.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';

@Controller('appointment-status')
export class AppointmentStatusController {
  constructor(private readonly appointmentStatusService: AppointmentStatusService) {}

  @Post()
  async createAppointmentStatus(
    @Body() createAppointmentStatusDto: CreateAppointmentStatusDto,
  ) {
    return await this.appointmentStatusService.createAppointmentStatus(createAppointmentStatusDto);
  }

  @Get(':id')
  async getAppointmentStatus(@Param('id') id: string) {
    return await this.appointmentStatusService.getAppointmentStatus(parseInt(id));
  }

  @Get()
  async getAllAppointmentStatuses() {
    return await this.appointmentStatusService.getAllAppointmentStatuses();
  }

  @Put(':id')
  async updateAppointmentStatus(
    @Param('id') id: string,
    @Body() updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ) {
    return await this.appointmentStatusService.updateAppointmentStatus(parseInt(id), updateAppointmentStatusDto);
  }

  @Delete(':id')
  async deleteAppointmentStatus(@Param('id') id: string) {
    await this.appointmentStatusService.deleteAppointmentStatus(parseInt(id));
  }
}
