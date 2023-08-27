import { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found.");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: "d7rlT2bI!Qw$kOk0v9T92BpaO70*jDdF"
      });

      request["user"] = payload;
    } catch {
      throw new UnauthorizedException("Token expired or invalid.");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
