import { Inject, Injectable, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PresenterPermissionModule } from "./presenter-permission/presenter-permission.module";
import { ModeratorPermissionModule } from "./moderator-permission/moderator-permission.module";
import { ProjectModule } from "./project/project.module";
import { QuestionModule } from './question/question.module';
import { IncomingQuestionModule } from './incoming-question/incoming-question.module';
import { ModeratorViewModule } from './moderator-view/moderator-view.module';
import { PresenterViewModule } from './presenter-view/presenter-view.module';
import { LiveQuestionModule } from './live-question/live-question.module';
import { ArchiveQuestionModule } from './archive-question/archive-question.module';
import { TimerModule } from './timer/timer.module';
import { RemarkModule } from './remark/remark.module';
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
    ProjectModule,
    QuestionModule,
    IncomingQuestionModule,
    ModeratorViewModule,
    PresenterViewModule,
    LiveQuestionModule,
    ArchiveQuestionModule,
    TimerModule,
    RemarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
