import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class WSJwtStrategy extends PassportStrategy(Strategy, "ws-jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
      ignoreExpiration: false,
      secretOrKey: "mykey",
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
