import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ description: 'Example field (placeholder)' })
  email: string;

  @Field()
  password: string;
}
