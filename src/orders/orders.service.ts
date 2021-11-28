import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { AddProductToOrder } from './types/add-product-to-order';
import { ProductsService } from '../products/products.service';
import { OrderProducts } from './order-products.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
    private readonly productsService: ProductsService,
  ) {}

  createOrder(userId: number) {
    const order = new Order();
    order.userId = userId;
    return this.repository.save(order);
  }

  async addProductToOrder(
    userId: number,
    { productId, orderId }: AddProductToOrder,
  ): Promise<Order> {
    const order = await this.repository.findOneOrFail({
      where: {
        id: orderId,
      },
      relations: ['orderProducts'],
    });

    OrdersService._checkIsOrderBelongsToUser(userId, order);

    /* check is product exist */
    await this.productsService.findById(productId);

    const orderProduct = order.orderProducts.find(
      (item) => item.productId === productId,
    );

    if (orderProduct !== undefined) {
      orderProduct.count = orderProduct.count + 1;
    } else {
      const orderProduct = new OrderProducts();
      orderProduct.orderId = order.id;
      orderProduct.productId = productId;
      order.orderProducts.push(orderProduct);
    }

    return this.repository.save(order);
  }

  async confirmOrder(userId: number, orderId: number) {
    const order = await this.repository.findOneOrFail({
      where: {
        id: orderId,
      },
    });
    OrdersService._checkIsOrderBelongsToUser(userId, order);
    order.status = 'confirmed';
    return this.repository.save(order);
  }

  private static _checkIsOrderBelongsToUser(userId: number, order: Order) {
    if (userId !== order.userId)
      throw new Error('Order doesnt belongs to user');
  }
}
