import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Message {
    @Field()
    success: boolean;
    
    @Field()
    message: string;
}