import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { ProductsModule } from "./modules/products/products.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
    AuthenticationModule,
    UsersModule,
    ProductsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
