import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";

import { AuthGuard } from "../../infra/providers/auth-guard.provider";
import type { CreateUserDTO } from "./dto/create-user.dto";
import type { UpdateRolesDTO } from "./dto/update-roles.dto";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() { name, username, password }: CreateUserDTO) {
    return this.usersService.create({
      name,
      username,
      password
    });
  }

  @Put("/:userId/roles")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async updateRoles(
    @Param("userId") userId: string,
    @Body() { roles }: UpdateRolesDTO
  ) {
    return this.usersService.updateRoles({
      userId,
      roles
    });
  }
}
