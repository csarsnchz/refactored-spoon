import { IsString, IsNotEmpty, IsNumber, IsDate, IsBoolean, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    professionalId: number;

    @IsNumber()
    @IsNotEmpty()
    serviceId: number;

    @IsDateString()
    @IsNotEmpty()
    appiontmentDate: Date;

    @IsDateString()
    @IsNotEmpty()
    appointmentTime: Date;

    @IsBoolean()
    appointmentRecurring: boolean;

    @IsString()
    appointmentRecurrencePattern: string;

    @IsNumber()
    @IsNotEmpty()
    statusId: number;
}
