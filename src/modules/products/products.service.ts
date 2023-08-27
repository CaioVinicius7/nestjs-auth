import { Model } from "mongoose";

import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Product } from "./product.schema";

interface CreateProductRequest {
  name: string;
  description: string;
  code: string;
  price: number;
  quantity: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  async create({
    name,
    description,
    code,
    price,
    quantity
  }: CreateProductRequest) {
    const productAlreadyExists = await this.productModel.findOne({
      code
    });

    if (productAlreadyExists) {
      throw new BadRequestException("Product already exists.");
    }

    const createdProduct = new this.productModel({
      name,
      description,
      code,
      price,
      quantity
    });

    const product = await createdProduct.save();

    return {
      product
    };
  }

  async listAll() {
    const products = await this.productModel.find();

    return {
      products
    };
  }
}
