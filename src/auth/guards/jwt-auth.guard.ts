import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req; // Get request object in GraphQL
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new UnauthorizedException("Invalid or missing token");
        }
        return user;
    }
}
