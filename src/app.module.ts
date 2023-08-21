import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
