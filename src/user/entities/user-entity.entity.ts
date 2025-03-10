import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Roles {
    @Field()
    id: number;

    @Field()
    name: string;
}

@ObjectType()
export class UserEntity {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => Roles)
    role: Roles;

    @Field({ nullable: true })
    mobileNo: number;
}