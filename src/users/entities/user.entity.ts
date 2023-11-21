import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  user_id: number;

  @Field({ description: 'Example field (placeholder)' })
  email: string;
}
