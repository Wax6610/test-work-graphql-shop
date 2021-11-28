import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { SignUpDto } from './types/sign-up.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { User } from './user.entity';
import { UserJwtContext } from './types/user-jwt-context';

@Resolver()
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Query((returns) => String)
  async signIn(@Args('email') email: string): Promise<string> {
    const user = await this.service.findUser(email);
    return this.service.createJwtToken(user);
  }

  @Mutation((returns) => String)
  async signUp(@Args('signUpData') signUpData: SignUpDto): Promise<string> {
    try {
      const taken = await this.service.findUser(signUpData.email);
      if (taken) throw new Error('email already taken');

      const user = await this.service.createUser(signUpData);
      return this.service.createJwtToken(user);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @UseGuards(new AuthGuard())
  @Query((returns) => User)
  async profile(@Context('user') user: UserJwtContext): Promise<User> {
    return this.service.profile(user.id);
  }
}
