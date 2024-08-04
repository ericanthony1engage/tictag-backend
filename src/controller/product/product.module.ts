import { Module } from '@nestjs/common';
import { ProductServiceModule } from '../../services/product/product.service.module';
import { ProductController } from './product.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStaffGuard } from '../../auth/jwt/jwt-staff.guard';

@Module({
  imports: [
    ProductServiceModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [JwtStaffGuard],
  controllers: [ProductController],
})
export class ProductControllerModule {}
