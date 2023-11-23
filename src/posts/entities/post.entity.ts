import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class Post {
    @Field()
    post_id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    author: User;

    @Field()
    status: boolean;

    @Field()
    createdTime: string;

    @Field()
    updatedTime: string;

}
