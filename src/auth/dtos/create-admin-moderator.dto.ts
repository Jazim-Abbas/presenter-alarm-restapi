import { IsEnum } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export enum UserType {
  MODERATOR = "moderator",
  ADMIN = "admin",
}

export class CreateAdminOrModeratorDto extends CreateUserDto {
  @IsEnum(UserType)
  accountType: UserType;
}

export class AdminOrModeratorDto extends CreateUserDto {
  isAdmin: boolean;
}