import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/database/user.entity";
import { Repository } from "typeorm";

@ValidatorConstraint({ async: true }) // Ensure it's async
@Injectable()
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async validate(email: string, args: ValidationArguments) {
        if (!email) return false; // Ensure email exists before checking
        const emailExist = await this.userRepository.findOne({ where: { email: email.toLowerCase() } });
        console.log("Checking email existence:", emailExist);
        return !emailExist; // Return true if email does NOT exist (valid)
    }

    defaultMessage(args: ValidationArguments) {
        return "Email already exists. Please use another email.";
    }
}

// ✅ Custom Decorator Function
export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}
