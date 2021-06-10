import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { RolesGuard } from "./common/guards/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    })
  );
  // app.useGlobalGuards(new RolesGuard(new Reflector()));

  const config = new DocumentBuilder()
    .setTitle("Presenter Alarm App")
    .setDescription("Presenter Alarm RestApi")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
