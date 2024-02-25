import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@Controller('appointment')
export class AppointmentController {

    constructor(private readonly appointmentService: AppointmentService) { }

    @Post('create')
    async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @Get()
    async findAll() {
        return this.appointmentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.appointmentService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.appointmentService.update(+id, updateAppointmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.appointmentService.remove(+id);
    }
}
