import { SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRole } from "src/auth/interfaces/user-role.interface";
import { RolesGuard } from "../guards/roles.guard";

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const RolesGuardAuth = () => UseGuards(AuthGuard("jwt"), RolesGuard);
