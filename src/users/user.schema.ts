import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({
    unique: true
  })
  username: string;

  @Prop()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
