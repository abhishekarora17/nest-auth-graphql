
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        
        if (!requiredRoles) {
          return true; // No roles required, allow access
        }
    
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
    
        if (!user || !requiredRoles.includes(user.role)) {
          throw new ForbiddenException("You do not have permission to perform this action");
        }
    
        return true;
    }

}
