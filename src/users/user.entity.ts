import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
@ObjectType()
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field((type) => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
