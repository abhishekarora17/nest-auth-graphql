import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RoleEntity {
    @Field()
    id: number;

    @Field()
    name: string;
}

@ObjectType()
export class UserRegister {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => RoleEntity, {nullable: true})
    role: RoleEntity;

    @Field({ nullable: true })
    mobileNo: number;

    @Field({ defaultValue : "Thanks for signing In!" })
    message: string;

    @Field({ nullable: true })
    refreshToken?: string;

    @Field({ nullable: true })
    accessToken?: string;
}