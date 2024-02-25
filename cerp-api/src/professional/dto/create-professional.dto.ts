import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class CreateProfessionalDto {
    @IsString()
    @IsNotEmpty()
    professionalName: string;

    @IsNumber()
    specializationId: number;

    @IsString()
    @IsNotEmpty()
    professionalPhone: string;

    @IsEmail()
    @IsNotEmpty()
    professionalEmail: string;

    @IsString()
    @IsNotEmpty()
    professionalServices: string;
}