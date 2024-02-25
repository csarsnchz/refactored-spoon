import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentStatusDto {
    @IsString()
    @IsNotEmpty()
    statusName: string;

}