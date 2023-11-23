import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";


@InputType()
export class CreatePostInput {
    @Field()
    @IsString()
    @MinLength(2)
    title: string

    @Field()
    @IsString()
    @MinLength(10)
    content: string

    @Field({nullable: true})
    @IsNumber()
    @IsOptional()
    user_id: number;
}