import { IsEmail } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpDto {
  @IsEmail()
  @Field()
  email: string;
}
