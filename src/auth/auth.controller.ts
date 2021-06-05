import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserWithRoleDto } from "./dtos/create-user-with-role.dto";
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
