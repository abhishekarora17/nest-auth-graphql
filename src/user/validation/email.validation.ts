import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor( protected readonly userService: UserService) { }
    async validate(email: any, args: ValidationArguments) {

        const emailExist = await this.userService.findOneByEmail({ where: { email } });

        if (emailExist) {
            return false;
        } else {
            return true;
        }
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}