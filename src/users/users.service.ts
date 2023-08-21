import { hash } from "bcrypt";
import { Model } from "mongoose";

import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./user.schema";

interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute({ name, username, password }: CreateUserRequest) {
    const userAlreadyExists = await this.userModel
      .findOne({
        username
      })
      .exec();

    if (userAlreadyExists) {
      throw new BadRequestException("User already exists!");
    }

    const hashedPassword = await hash(password, 10);

    const createdUser = new this.userModel({
      name,
      username,
      password: hashedPassword
    });

    const user = await createdUser.save();

    return {
      user
    };
  }
}
