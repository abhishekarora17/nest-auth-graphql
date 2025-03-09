    import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
    import { RoleDto } from 'src/roles/enum/roles-dto.enum';

    registerEnumType(RoleDto, {
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

        @Field((type) => RoleDto , {defaultValue: RoleDto.User})
        role: RoleDto;
    }

