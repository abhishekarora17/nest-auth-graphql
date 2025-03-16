import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginateInput {
    @Field(() => Int, { defaultValue: 10 })
    limit: number;

    @Field(() => Int, { defaultValue: 0 })
    offset: number; // how many first rows need to be skipped
}

