import { Body, Controller, Get, Post } from "@nestjs/common";

import { Role, Roles } from "../../decorators/roles.decorator";
import type { CreateProductDTO } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";

@Controller("/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.ADMIN)
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
  @Roles(Role.USER, Role.ADMIN)
  async listAll() {
    return this.productsService.listAll();
  }
}
