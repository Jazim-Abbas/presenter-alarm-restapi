import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RolesGuard } from "./common/guards/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard(new Reflector()));

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
