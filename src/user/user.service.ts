import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/auth/dtos/create-user.dto";
import { SuperUser } from "src/auth/interfaces/superuser.interface";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>
  ) {}

  async createSuperUser(createUserDto: CreateUserDto) {
    await this.throwErrorIfSuperUserExists();
    const superUser: SuperUser = { ...createUserDto, isSuperUser: true };
    return this.createUser(superUser);
  }

  private async throwErrorIfSuperUserExists() {
    const user = await this.userModel.findOne({ isSuperUser: true });

    if (user) {
      throw new BadRequestException("Ssuperuser should be created only once");
    }
  }

  private async createUser(user) {
    try {
      const newUser = new this.userModel({ ...user });
      return await newUser.save();
    } catch (_) {
      throw new BadRequestException("Email already exists");
    }
  }
}
