// import { plainToClass } from "class-transformer";
// import { TokenResponse } from "./token.response";

// export class RoleResponse {
//     id: number;
//     name: string;
// }

// export class UserRegisterResponse {
//     id:number;
//     name:string;
//     email: string;
//     mobileNo: number;
//     role:RoleResponse;
//     message:string;
//     Token: TokenResponse;

//     static decode(input: any, tokens: tokens): UserRegisterResponse {
//         const obj = plainToClass(this, input);
//         obj.access_token = tokens.access_token;
//         obj.refresh_token = tokens.refresh_token;
//         return obj;
//     }
// }