import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async findBySlug(slug: string): Promise<Product[]> {
    return this.repository.find({
      where: {
        slug,
      },
      relations: ['category'],
    });
  }

  async findById(id: number): Promise<Product> {
    return this.repository.findOneOrFail(id);
  }
}
