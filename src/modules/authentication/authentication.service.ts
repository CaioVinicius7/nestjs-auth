import { compare } from "bcrypt";
import { Model } from "mongoose";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "../users/user.schema";

interface SignInRequest {
  username: string;
  password: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async signIn({ username, password }: SignInRequest) {
    const user = await this.userModel.findOne({
      username
    });

    if (!user) {
      throw new UnauthorizedException("Incorrect username or password.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException("Incorrect username or password.");
    }

    const payload = {
      sub: user._id,
      name: user.name,
      username: user.username
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken
    };
  }
}
