import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    unique: true
  })
  code: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number[];
}

export const productSchema = SchemaFactory.createForClass(Product);
