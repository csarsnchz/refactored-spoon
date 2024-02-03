import { IsString, IsEmail, IsOptional, IsInt, IsNotEmpty, Length } from 'class-validator';

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

    @IsNotEmpty()
    @IsString()
    @Length(8, 20, {message: 'Password must be at least 8 characters long'}) 
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
