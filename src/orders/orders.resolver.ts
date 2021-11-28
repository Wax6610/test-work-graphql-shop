import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/auth.guard';
import { UserJwtContext } from '../users/types/user-jwt-context';
import { AddProductToOrder } from './types/add-product-to-order';

@Resolver()
export class OrdersResolver {
  constructor(private readonly service: OrdersService) {}

  @UseGuards(new AuthGuard())
  @Mutation((returns) => Order)
  async createOrder(@Context('user') user: UserJwtContext): Promise<Order> {
    try {
      return this.service.createOrder(user.id);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @UseGuards(new AuthGuard())
  @Mutation((returns) => Order)
  async addProductToOrder(
    @Context('user') user: UserJwtContext,
    @Args('payload') payload: AddProductToOrder,
  ): Promise<Order> {
    try {
      return this.service.addProductToOrder(user.id, payload);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @UseGuards(new AuthGuard())
  @Mutation((returns) => Order)
  async confirmOrder(
    @Context('user') user: UserJwtContext,
    @Args('orderId') orderId: number,
  ): Promise<Order> {
    try {
      return this.service.confirmOrder(user.id, orderId);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
