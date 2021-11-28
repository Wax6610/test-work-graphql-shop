import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
@ObjectType()
export class Category {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  slug: string;

  @Field((type) => [Product])
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
