import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserLoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
