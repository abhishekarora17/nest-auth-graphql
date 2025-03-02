import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AppDataSource } from "src/database/app-datasource";
import { User } from "src/user/database/user.entity";

export const CurrentUser =  createParamDecorator( async(data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const user = request.user;

    if (!user) {
        return null;
    }

    const userRepository = AppDataSource.getRepository(User);

    return await userRepository.findOne({ where: { id: user.id } });
});
