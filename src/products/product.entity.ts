import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
@ObjectType()
export class Product {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column({ name: 'category_id' })
  categoryId: number;

  @Field((type) => Int)
  @Column()
  price: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  slug: string;

  @Field((type) => Category)
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
