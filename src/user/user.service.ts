import { Injectable } from "@nestjs/common";
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
    const superUser: SuperUser = { ...createUserDto, isSuperUser: true };
    const newUser = new this.userModel({ ...superUser });
    return await newUser.save();
  }
}
