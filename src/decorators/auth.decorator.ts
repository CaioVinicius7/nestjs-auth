import { RolesGuard } from "src/infra/providers/roles-guard.provider";

import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";

import { AuthGuard } from "../infra/providers/auth-guard.provider";
import { ROLES_KEY, Role } from "./roles.decorator";

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard)
  );
}
