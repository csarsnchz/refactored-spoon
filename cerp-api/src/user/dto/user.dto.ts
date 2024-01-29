import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    state: string;

    @IsInt()
    @IsOptional()
    counter: number;

    @IsString()
    tenant: string;
}
