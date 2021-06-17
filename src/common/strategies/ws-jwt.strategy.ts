import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class WSJwtStrategy extends PassportStrategy(Strategy, "ws-jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
      ignoreExpiration: false,
      secretOrKey: "mykey",
    });
  }

  validate(payload: any) {
    console.log("inside valida", payload);

    return payload;
  }
}
