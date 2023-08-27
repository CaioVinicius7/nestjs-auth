import { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

import { ROLES_KEY, Role } from "../../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found.");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: "d7rlT2bI!Qw$kOk0v9T92BpaO70*jDdF"
      });

      const hasRequiredRole = requiredRoles.some((role) =>
        payload.roles.includes(role)
      );

      request["user"] = payload;

      return hasRequiredRole;
    } catch {
      throw new UnauthorizedException("Token expired or invalid.");
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
