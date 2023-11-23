import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginJwt {
    @Field()
    access_token: string;
}