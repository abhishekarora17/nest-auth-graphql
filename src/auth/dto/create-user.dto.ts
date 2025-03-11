import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { RoleDto } from 'src/roles/enum/roles-dto.enum';
import { IsEmailAlreadyExist } from '../validation/email.validation';

registerEnumType(RoleDto, {
    name: 'Role',
});

@InputType()
export class CreateUserDto {
    @Field()
    name: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message : "This email is already in use."})
    email: string;

    @Field()
    password: string;

    @Field((type) => Int , {nullable: true})
    mobileNo: number;

    @Field((type) => RoleDto , {defaultValue: RoleDto.User})
    role: RoleDto;
}

