import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    mobileNo: number;
}