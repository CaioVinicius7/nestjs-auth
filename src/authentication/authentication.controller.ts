import { Body, Controller, Post } from "@nestjs/common";

import { AuthenticationService } from "./authentication.service";
import type { SignInDTO } from "./dto/sign-in.dto";

@Controller("/auth")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("/sign-in")
  async signIn(@Body() { username, password }: SignInDTO) {
    return this.authenticationService.signIn({
      username,
      password
    });
  }
}
