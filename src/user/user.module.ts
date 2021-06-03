import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import { UserEntity, UserSchema } from "./entities/user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: UserEntity.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre("save", function (next) {
            const user = this;

            if (!user.password) return next();

            if (!user.isModified("password")) return next();

            bcrypt.genSalt(10, function (err, salt) {
              if (err) return next(err);

              bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
              });
            });
          });

          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
