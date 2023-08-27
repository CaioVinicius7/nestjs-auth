import { Body, Controller, Get, Post } from "@nestjs/common";

import { Auth } from "../../decorators/auth.decorator";
import { Role } from "../../decorators/roles.decorator";
import type { CreateProductDTO } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";

@Controller("/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(Role.ADMIN)
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

  @Get()
  @Auth(Role.USER, Role.ADMIN)
  async listAll() {
    return this.productsService.listAll();
  }
}
