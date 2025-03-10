import { plainToClass } from "class-transformer";

export class Role {
    id: number;
    name: string;
}
export class TokenResponse {
    accessToken: string;
    refreshToken: string;

    static decode(input: any): TokenResponse {
        return plainToClass(this, input);
    }
}

export class AuthResponse {
    id:number;
    name:string;
    email: string;
    mobileNo: number;
    role:Role;
    message:string;
    Token: TokenResponse;

    static decode(input: any): AuthResponse {
        return plainToClass(this, input);
    }
}