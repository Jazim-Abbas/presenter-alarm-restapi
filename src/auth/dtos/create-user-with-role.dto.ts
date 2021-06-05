import { IsEnum } from "class-validator";
import { UserRoleWithoutSuperUser } from "../interfaces/user-role.interface";
import { CreateUserDto } from "./create-user.dto";

export class CreateUserWithRoleDto extends CreateUserDto {
  @IsEnum(UserRoleWithoutSuperUser)
  role: UserRoleWithoutSuperUser;
}
