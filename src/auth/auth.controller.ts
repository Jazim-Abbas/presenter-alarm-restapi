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
    await this.authService.createSuperUser(createUserDto);
    return "Successfully created superuser";
  }

  @Post("register-user")
  async createAdminOrModerator(
    @Body() createAdminOrModerator: CreateAdminOrModeratorDto
  ) {
    await this.authService.createAdminOrModerator(createAdminOrModerator);
    return "Successfully created user";
  }

  @Post("login")
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
