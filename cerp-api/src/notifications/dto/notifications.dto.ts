import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class NotificationsDto{
  
  @IsString()
  user_id:string;
  @IsString()
  icon:string;
  @IsString()
  title:string;
  @IsString()
  description:string;
  @IsString()
  color:string;
  @IsString()
  status:string;
  @IsOptional()
  @IsString()
  url:string;
  @IsOptional()
  @IsBoolean()
  is_viewed:Boolean;
}