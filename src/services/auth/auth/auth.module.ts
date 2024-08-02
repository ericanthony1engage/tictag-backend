import { Module } from '@nestjs/common';
import { JwtStrategy } from '../../../auth/jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UserRepositoryModule } from '../../../repository/user/user.repository.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserRepositoryModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    {
      provide: JwtStrategy,
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        return new JwtStrategy(jwtSecret);
      },
      inject: [ConfigService],
    },
  ],
  exports: [AuthService, JwtService],
})
export class AuthServiceModule {}
