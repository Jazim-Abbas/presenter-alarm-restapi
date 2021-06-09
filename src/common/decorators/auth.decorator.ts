import { UseGuards } from "@nestjs/common";
import { AuthGuard as AuthenticationGuard } from "@nestjs/passport";

export const AuthGuard = () => UseGuards(AuthenticationGuard("jwt"));
