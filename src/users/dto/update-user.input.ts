import { IsEmail, IsNumber, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsString()
  @IsEmail()
  @Field(() => ID, { nullable: true })
  email?: string;

  @IsString()
  @Field(() => ID, {nullable: true})
  password?: string;
}
