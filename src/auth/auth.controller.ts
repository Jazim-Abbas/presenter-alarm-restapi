import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/decorators/auth.decorator";
import { Roles, RolesGuardAuth } from "src/common/decorators/roles.decorator";
import { User } from "src/common/decorators/user.decorator";
import { AuthService } from "./auth.service";
import { CreateUserWithRoleDto } from "./dtos/create-user-with-role.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { SwitchUserRoleDto } from "./dtos/switch-user-role.dto";
import { UpdateProfileDto } from "./dtos/update-profile.dto";
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

  @RolesGuardAuth()
  @Roles(UserRole.SUPER_USER)
  @Post("switch-user-role")
  async switchUserRole(@Body() switchUserRoleDto: SwitchUserRoleDto) {
    return this.authService.switchUserRole(switchUserRoleDto);
  }

  @AuthGuard()
  @Post("update-profile")
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @User("_id") userId: string
  ) {
    await this.authService.updateUserProfile({
      ...updateProfileDto,
      user: userId,
    });
    return { message: "Successfully update the user profile" };
    return userId;
    return updateProfileDto;
  }
}
