import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";


@InputType()
export class LogInUserInput {
    @IsString()
    @IsEmail()
    @Field(() => ID)
    email: string;

    @IsString()
    @Field(() => ID)
    password: string;
}