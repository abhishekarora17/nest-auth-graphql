import { Field, ObjectType } from "@nestjs/graphql";

// @ObjectType()
// export class RoleEntity {
//     @Field()
//     id: number;

//     @Field()
//     name: string;
// }

@ObjectType()
export class User {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    // @Field(() => RoleEntity, {nullable: true})
    // role: RoleEntity;

    @Field({ nullable: true })
    mobileNo: number;

    @Field({ nullable: true })
    refreshToken?: string;

    @Field({ nullable: true })
    accessToken?: string;
}

@ObjectType()
export class UserEntity {
    @Field()
    success: boolean;

    @Field()
    message: string;
    
    @Field(() => User,{ nullable: true })
    data: User;
}