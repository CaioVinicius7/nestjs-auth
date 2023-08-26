import { hash } from "bcrypt";
import { Model } from "mongoose";

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./user.schema";

interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
}

interface UpdateRolesRequest {
  userId: string;
  roles: string[];
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create({ name, username, password }: CreateUserRequest) {
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

  async updateRoles({ userId, roles }: UpdateRolesRequest) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    user.set("roles", roles);

    await user.save();
  }
}
