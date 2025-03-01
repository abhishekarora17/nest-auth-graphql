import { applyDecorators, UseGuards } from "@nestjs/common";

export function Auth() {
    return applyDecorators(UseGuards(Auth));
}
