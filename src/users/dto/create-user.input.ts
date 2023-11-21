import { InputType, Int, Field,  } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsEmail()
  @Field({ description: 'Example field (placeholder)' })
  email: string;

  @IsString()
  @Field({ description: 'Example field (placeholder)' })
  password: string;
}
