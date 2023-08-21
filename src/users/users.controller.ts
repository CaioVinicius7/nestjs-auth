import { Body, Controller, Post } from "@nestjs/common";

import type { CreateUserDTO } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() { name, username, password }: CreateUserDTO) {
    return this.usersService.execute({
      name,
      username,
      password
    });
  }
}
