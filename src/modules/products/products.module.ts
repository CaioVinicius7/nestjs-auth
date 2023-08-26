import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Product, productSchema } from "./product.schema";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: productSchema
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
