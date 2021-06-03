import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity, UserSchema } from "./entities/user.entity";
import { passwordHashMiddleware } from "./middlewares/password-hash.middleware";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: UserEntity.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre("save", passwordHashMiddleware);
          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
