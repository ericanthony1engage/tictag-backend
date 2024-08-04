import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { USER_ROLES } from '../../enum/role';

@Injectable()
export class JwtCustomerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    const user = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return user.role === USER_ROLES.CUSTOMER;
  }
}
