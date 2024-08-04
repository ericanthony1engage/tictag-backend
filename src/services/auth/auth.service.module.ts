import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryModule } from '../../repository/user/user.repository.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserRepositoryModule, PassportModule],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthServiceModule {}
