import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import { User, userSchema } from "../users/user.schema";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "d7rlT2bI!Qw$kOk0v9T92BpaO70*jDdF",
      signOptions: {
        expiresIn: "1d"
      }
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      }
    ])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
