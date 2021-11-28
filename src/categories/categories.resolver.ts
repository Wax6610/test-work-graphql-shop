import { Resolver, Query, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly service: CategoriesService) {}

  @Query((returns) => [Category])
  async findCategoryBySlug(@Args('slug') slug: string): Promise<Category[]> {
    return this.service.findBySlug(slug);
  }
}
