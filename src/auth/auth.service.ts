import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createSuperUser(createUserDto: CreateUserDto) {
    return this.userService.createSuperUser(createUserDto);
  }
}
