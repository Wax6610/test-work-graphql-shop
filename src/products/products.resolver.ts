import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Resolver()
export class ProductsResolver {
  constructor(private readonly service: ProductsService) {}

  @Query((returns) => [Product])
  async findProductBySlug(@Args('slug') slug: string): Promise<Product[]> {
    return this.service.findBySlug(slug);
  }
}
