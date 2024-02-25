import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAppointmentStatusDto {
    @IsString()
    @IsNotEmpty()
    statusName: string;

}