import { Inject, Injectable, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PresenterPermissionModule } from './presenter-permission/presenter-permission.module';
import { ModeratorPermissionModule } from './moderator-permission/moderator-permission.module';
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("MONGO_URI"),
      }),
    }),
    UserModule,
    AuthModule,
    PresenterPermissionModule,
    ModeratorPermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
