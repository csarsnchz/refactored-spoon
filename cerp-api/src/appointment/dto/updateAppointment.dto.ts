import { IsNotEmpty, IsOptional, IsDateString, IsString, IsNumber } from 'class-validator';

export class UpdateAppointmentDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
    
    @IsNumber()
    professionalId: number;

    @IsNumber()
    serviceId: number;
    
    @IsDateString()
    @IsNotEmpty()
    appiontmentDate: Date;

    @IsDateString()
    @IsNotEmpty()
    appointmentTime: Date;

    @IsNumber()
    statusId: number;
}