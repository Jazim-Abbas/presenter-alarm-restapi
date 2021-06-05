import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles, RolesGuardAuth } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { AuthService } from "./auth.service";
import { CreateUserWithRoleDto } from "./dtos/create-user-with-role.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserLoginDto } from "./dtos/user-login.dto";
import { UserRole } from "./interfaces/user-role.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register-superuser")
  async createSuperUser(@Body() createUserDto: CreateUserDto) {
    await this.authService.createSuperUser(createUserDto);
    return "Successfully created superuser";
  }

  @RolesGuardAuth()
  @Roles(UserRole.SUPER_USER)
  @Post("register-user")
  async createAnyUserButNotSuperUser(
    @Body() createUserDto: CreateUserWithRoleDto
  ) {
    await this.authService.createAnyUserButNotSuperUser(createUserDto);
    return "Successfully created user";
  }

  @Post("login")
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
