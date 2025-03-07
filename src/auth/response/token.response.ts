import { plainToClass } from "class-transformer";

export class TokenResponse {
    accessToken: string;
    refreshToken: string;

    static decode(input: any): TokenResponse {
        return plainToClass(this, input);
    }
}