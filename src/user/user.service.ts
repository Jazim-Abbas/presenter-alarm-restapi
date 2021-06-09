import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserWithRoleDto } from "src/auth/dtos/create-user-with-role.dto";
import { CreateUserDto } from "src/auth/dtos/create-user.dto";
import { SwitchUserRoleDto } from "src/auth/dtos/switch-user-role.dto";
import { UserLoginDto } from "src/auth/dtos/user-login.dto";
import { UserProfile } from "src/auth/interfaces/user-profile.interface";
import { UserRole } from "src/auth/interfaces/user-role.interface";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>
  ) {}

  async createSuperUser(createUserDto: CreateUserDto) {
    await this._throwErrorIfSuperUserExists();

    const superUser = { ...createUserDto, role: UserRole.SUPER_USER };
    return this._createUser(superUser);
  }

  async createUser(createUserDto: CreateUserWithRoleDto) {
    return this._createUser(createUserDto);
  }

  async switchUserRole(userRole: SwitchUserRoleDto) {
    const user = await this.userModel.findById(userRole.userId);

    if (!user) throw new NotFoundException("user not found");

    user.role = userRole.role as unknown as UserRole;
    await user.save();
  }

  async updateUserProfile(profile: UserProfile) {
    const user = await this.userModel.findById(profile.user);

    if (!user) throw new NotFoundException("user not found");

    try {
      const { name, email } = profile;
      user.name = name ?? user.name;
      user.email = email ?? user.email;

      await user.save();
    } catch (_) {
      throw new BadRequestException("Email already exists");
    }
  }

  async findByLogin(userLoginDto: UserLoginDto) {
    const { email } = userLoginDto;
    const userInDb = await this._findByEmail(email);

    if (!userInDb) throw new UnauthorizedException("Invalid credentials");

    return userInDb;
  }

  private async _throwErrorIfSuperUserExists() {
    const user = await this.userModel.findOne({ role: UserRole.ADMIN });

    if (user) {
      throw new BadRequestException("Ssuperuser should be created only once");
    }
  }

  private async _createUser(user) {
    try {
      const newUser = new this.userModel({ ...user });
      return await newUser.save();
    } catch (_) {
      throw new BadRequestException("Email already exists");
    }
  }

  private async _findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
