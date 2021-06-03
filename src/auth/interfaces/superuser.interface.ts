import { OmitType } from "@nestjs/mapped-types";
import { User } from "./user.interface";

export class SuperUser extends OmitType(User, ["id" as const]) {
  isSuperUser: boolean;
}
