    import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
    import { RolesEnum } from 'src/roles/enum/roles.enum';

    registerEnumType(RolesEnum, {
        name: 'Role',
    });

    @InputType()
    export class CreateUserDto {
        @Field()
        name: string;

        @Field()
        email: string;

        @Field()
        password: string;

        @Field((type) => Int , {nullable: true})
        mobileNo: number;

        @Field((type) => RolesEnum , {defaultValue: RolesEnum.User})
        roleId: RolesEnum;
    }

