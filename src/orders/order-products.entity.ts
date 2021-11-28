import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity({ name: 'order_products' })
@ObjectType()
export class OrderProducts {
  @PrimaryColumn({ name: 'order_id' })
  @Field((type) => Int)
  orderId: number;

  @PrimaryColumn({ name: 'product_id' })
  @Field((type) => Int)
  productId: number;

  @Field((type) => Int)
  @Column({ default: 1 })
  count: number;

  @Field((type) => [OrderProducts])
  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  orders: Order[];

  @Field((type) => Product)
  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
