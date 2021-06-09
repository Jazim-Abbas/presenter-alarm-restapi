import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateProfileDto extends PartialType(
  OmitType(CreateUserDto, ["password"] as const)
) {}
