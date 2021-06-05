import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/auth/interfaces/user-role.interface";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(
      'roles',
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log("user inside guards", user);

    return requiredRoles.find((_role) => _role == user.role) != null;
  }
}
