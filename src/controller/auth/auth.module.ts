import { Module } from '@nestjs/common';
import { AuthServiceModule } from '../../services/auth/auth/auth.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthServiceModule, PassportModule],
  controllers: [AuthController],
})
export class AuthControllerModule {}
