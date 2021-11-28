import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './types/sign-up.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  createUser({ email }: SignUpDto): Promise<User> {
    const user = new User();
    user.email = email;
    return this.repository.save(user);
  }

  async findUser(email: string): Promise<User> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async profile(userId) {
    return this.repository.findOne({
      where: {
        id: userId,
      },
      relations: [
        'orders',
        'orders.orderProducts',
        'orders.orderProducts.product',
      ],
    });
  }

  createJwtToken({ id, email }: User): string {
    return jwt.sign({ id, email }, 'secret');
  }
}
