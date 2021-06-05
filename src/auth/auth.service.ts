import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import {
  AdminOrModeratorDto,
  CreateAdminOrModeratorDto,
  UserType,
} from "./dtos/create-admin-moderator.dto";
import { CreateUserWithRoleDto } from "./dtos/create-user-with-role.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserLoginDto } from "./dtos/user-login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async createSuperUser(createUserDto: CreateUserDto) {
    return this.userService.createSuperUser(createUserDto);
  }

  async createAnyUserButNotSuperUser(createUserDto: CreateUserWithRoleDto) {
    return this.userService.createUser(createUserDto);
  }

  async createAdminOrModerator(
    createAdminOrModeratorDto: CreateAdminOrModeratorDto
  ) {
    const { accountType } = createAdminOrModeratorDto;
    const isAdmin = this._isUserAdmin(accountType);

    const adminOrModeratorDto: AdminOrModeratorDto = {
      ...createAdminOrModeratorDto,
      isAdmin,
    };
    return this.userService.createAdminOrModerator(adminOrModeratorDto);
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userService.findByLogin(userLoginDto);
    const token = this._createUserToken(user["_doc"]);

    const fields = { ...user["_doc"], token: token };
    return this._getUserFieldsExcludePassword(fields);
  }

  private _isUserAdmin(userType: UserType) {
    return userType.valueOf() == UserType.ADMIN;
  }

  private _createUserToken(user) {
    const accessToken = this.jwtService.sign({ ...user });
    return accessToken;
  }

  private _getUserFieldsExcludePassword(userFields) {
    const { password, ...fields } = userFields;
    return fields;
  }
}
