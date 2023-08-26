import { Body, Controller, Post } from "@nestjs/common";

import type { CreateProductDTO } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";

@Controller("/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() { name, description, code, price, quantity }: CreateProductDTO
  ) {
    return this.productsService.create({
      name,
      description,
      code,
      price,
      quantity
    });
  }
}
