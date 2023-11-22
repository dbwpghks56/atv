import { InputType, Int, Field, registerEnumType,  } from '@nestjs/graphql';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { Gender } from '../enums/user.enum';

registerEnumType(Gender, {
  name: 'Gender'
});

@InputType()
export class CreateUserInput {
  @IsString()
  @IsEmail()
  @Field({ description: 'Example field (placeholder)' })
  email: string;

  @IsString()
  @Field({ description: 'Example field (placeholder)' })
  password: string;

  @IsString()
  @Field()
  nickname: string;

  @IsString()
  @Field()
  birth: string;

  @IsEnum(Gender)
  @Field(type => Gender)
  gender: Gender;
}
