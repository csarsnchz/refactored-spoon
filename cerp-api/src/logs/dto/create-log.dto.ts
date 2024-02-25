import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLogDto {

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  msg?: string;

  @IsNotEmpty()
  username: string;
}
