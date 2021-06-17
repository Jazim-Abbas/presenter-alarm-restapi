import { Module } from "@nestjs/common";
import { WSJwtStrategy } from "./strategies/ws-jwt.strategy";

@Module({
  providers: [WSJwtStrategy],
})
export class CommonModule {}
