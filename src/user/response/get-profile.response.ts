import { plainToClass } from "class-transformer";

export class Roles {
    id: number;
    name: string;
}

export class GetProfileResponse {
    id: number;
    name: string;
    email: string;
    mobileNo: number;
    role: Roles;

    static decode(input: any): GetProfileResponse {
        return plainToClass(this, input);
    }
}