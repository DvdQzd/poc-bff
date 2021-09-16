import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {

    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authPermissions = this.getRequestPermissions(request.headers.authorization);
    return this.matchPermissions(permissions, authPermissions)
  }

  private getRequestPermissions(auth: string): any{
    const authData = this.jwtService.decode(auth.replace('Bearer ', ''));
    return authData['permissions'];
  }

  private matchPermissions(permissions: string[], authPermissions: string[]): boolean {
      return permissions.every(per => authPermissions.includes(per));
  }
}