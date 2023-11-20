import { InputType, Int, Field,  } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Example field (placeholder)' })
  email: string;

  @Field({ description: 'Example field (placeholder)' })
  password: string;
}
