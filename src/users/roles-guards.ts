import { Injectable, CanActivate, ExecutionContext,SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    return true;
    // Retrieve the required roles from metadata
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get the user object from the request
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log("user+-+- "+JSON.stringify(user));
    const data = JSON.parse(JSON.stringify(user));
    // Ensure user and user.roles are defined
    if (!data.user || !data.user.roles) {
      throw new Error('User or user roles are undefined');
    }

    // Check if any of the user's roles match the required roles
    return data.user.roles.some((role) => requiredRoles.includes(role.name || role));
  }
}



export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
