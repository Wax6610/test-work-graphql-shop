import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { User } from '../users/user.entity';
import { OrderProducts } from './order-products.entity';

@Entity()
@ObjectType()
export class Order {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @Column({ default: 'opened' })
  status: string;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Category;

  @Field((type) => [OrderProducts])
  @OneToMany(() => OrderProducts, (orderProduct) => orderProduct.orders, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  orderProducts: OrderProducts[];
}
