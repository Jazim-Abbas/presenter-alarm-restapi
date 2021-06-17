import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport";
// import { Strategy } from "passport-local";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class WSJwtStrategy extends PassportStrategy(Strategy, "ws-jwt") {
  // constructor() {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     ignoreExpiration: false,
  //     secretOrKey: "mykey",
  //   });
  // }

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

  // authenticate(req, options) {
  //   super.authenticate(req, options);
  // }
}
