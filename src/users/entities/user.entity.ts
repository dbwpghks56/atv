import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gender } from '../enums/user.enum';

@ObjectType()
export class User {
  @Field()
  user_id: number;

  @Field({ description: 'Example field (placeholder)' })
  email: string;

  @Field({ description: 'Example field (placeholder)' })
  nickname: string;

  @Field({ description: 'Example field (placeholder)' })
  birth: string;

  @Field(type => Gender, { description: 'Example field (placeholder)' })
  gender: Gender;

  @Field()
  status: boolean;

  @Field()
  createdTime: string;

  @Field()
  updatedTime: string;
}
