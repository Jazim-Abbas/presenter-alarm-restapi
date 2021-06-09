import { IsEnum, IsMongoId } from "class-validator";
import { UserRoleWithoutSuperUser } from "../interfaces/user-role.interface";

export class SwitchUserRoleDto {
  @IsEnum(UserRoleWithoutSuperUser)
  role: UserRoleWithoutSuperUser;

  @IsMongoId()
  userId: string;
}
