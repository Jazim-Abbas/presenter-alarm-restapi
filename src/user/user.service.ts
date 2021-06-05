import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserWithRoleDto } from "src/auth/dtos/create-user-with-role.dto";
import { CreateUserDto } from "src/auth/dtos/create-user.dto";
import { UserLoginDto } from "src/auth/dtos/user-login.dto";
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
