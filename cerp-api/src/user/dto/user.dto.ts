import { IsString, IsEmail, IsOptional, IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    codTipoNegocio: string;

    @IsString()
    @IsNotEmpty()
    codGiro: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20, {message: 'Password must be at least 8 characters long'}) 
    password: string;

    @IsNotEmpty()
    @IsString()
    tenant: string;
}
