import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

import { CreateUserWithRoleDto } from "./dtos/create-user-with-role.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { SwitchUserRoleDto } from "./dtos/switch-user-role.dto";
import { UserLoginDto } from "./dtos/user-login.dto";
import { UserProfile } from "./interfaces/user-profile.interface";

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

  async login(userLoginDto: UserLoginDto) {
    const user = await this.userService.findByLogin(userLoginDto);
    const token = this._createUserToken(user["_doc"]);

    const fields = { ...user["_doc"], token: token };
    return this._getUserFieldsExcludePassword(fields);
  }

  async switchUserRole(switchUserRoleDto: SwitchUserRoleDto) {
    return this.userService.switchUserRole(switchUserRoleDto);
  }

  async updateUserProfile(userProfile: UserProfile) {
    return this.userService.updateUserProfile(userProfile);
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
