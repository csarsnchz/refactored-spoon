import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppointmentService {
    constructor(private prisma: PrismaService) {}

   async create(createAppointmentDto: CreateAppointmentDto) {
        const userId = createAppointmentDto.userId;
        const professionalId = createAppointmentDto.professionalId;
        const serviceId = createAppointmentDto.serviceId;
        const appointmentDate = createAppointmentDto.appiontmentDate;
        const appointmentTime = createAppointmentDto.appointmentTime;
        const appointment = await this.prisma.appointment.findFirst({
            where: {
                userId: userId,
                professionalId: professionalId,
                serviceId: serviceId,
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime
            }
        });
        if (appointment) {
            throw new Error('Appointment already exists');
        }

        const newAppointment = await this.prisma.appointment.create({
            data: {
                userId: userId,
                professionalId: professionalId,
                serviceId: serviceId,
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime,
                appointmentRecurring: createAppointmentDto.appointmentRecurring,    
                appointmentRecurrencePattern: createAppointmentDto.appointmentRecurrencePattern,
                statusId: createAppointmentDto.statusId
            },
        });
        return newAppointment;
    }

    async findAll() {
        return await this.prisma.appointment.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.appointment.findFirst({
            where: {
                appointmentId: id,
            },
          });
    }

    async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
        const userId = updateAppointmentDto.userId;
        const professionalId = updateAppointmentDto.professionalId;
        const serviceId = updateAppointmentDto.serviceId;
        const appointmentDate = updateAppointmentDto.appiontmentDate;
        const appointmentTime = updateAppointmentDto.appointmentTime;
        const statusId = updateAppointmentDto.statusId;
        const appointment = await this.prisma.appointment.findFirst({
            where: {
                userId: userId,
                professionalId: professionalId,
                serviceId: serviceId,
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime,
                statusId: statusId
            }
        });
        if (appointment) {
            const updateAppointment = await this.prisma.appointment.update({
                where: {
                    appointmentId: id,
                },
                data: {
                    appointmentDate: appointmentDate,
                    appointmentTime: appointmentTime,
                    statusId: statusId
                },
              });
              if (!updateAppointment) {
                throw new Error('Appointment not updated');
                } else {
                    return( 
                    {
                        message: 'Appointment updated successfully',
                        data: updateAppointment
                    });
                }

            }else{
                throw new Error('Appointment not found');
        }
    }

    async remove(id: number) {
        const deleteAppointment = await this.prisma.appointment.delete({
            where: {
              appointmentId: id,
            },
          });
            if (!deleteAppointment) {
                throw new Error('Appointment not deleted');
            } else {
                return({message: 'Appointment deleted successfully'});
            }
        }        
}
