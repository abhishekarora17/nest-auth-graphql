import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRefreshTokenDto {
    @Field()
    refreshToken: string;
}