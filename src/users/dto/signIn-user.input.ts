import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";
import { IsEmail, IsString } from "class-validator";


@InputType()
export class SignInUserInput extends PartialType(CreateUserInput) {
    @IsString()
    @IsEmail()
    @Field(() => ID)
    email: string;

    @IsString()
    @Field(() => ID)
    password: string;
}