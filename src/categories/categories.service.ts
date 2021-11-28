import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async findBySlug(slug: string): Promise<Category[]> {
    return this.repository.find({
      where: {
        slug,
      },
      relations: ['products'],
    });
  }
}
