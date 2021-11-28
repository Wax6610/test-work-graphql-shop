import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class AddProductToOrder {
  @IsInt()
  @Field()
  productId: number;

  @IsInt()
  @Field()
  orderId: number;
}
