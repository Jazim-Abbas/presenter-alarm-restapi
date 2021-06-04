import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminOrModeratorDto } from "./dtos/create-admin-moderator.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserLoginDto } from "./dtos/user-login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register-superuser")
  async createSuperUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createSuperUser(createUserDto);
  }

  @Post("register-user")
  async createAdminOrModerator(
    @Body() createAdminOrModerator: CreateAdminOrModeratorDto
  ) {
    return this.authService.createAdminOrModerator(createAdminOrModerator);
  }

  @Post("login")
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
