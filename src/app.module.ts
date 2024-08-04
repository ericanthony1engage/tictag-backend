import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as joi from 'joi';
import { Connection } from './config/database/connection';
import { IConfigDto } from './dto/env.dto';
import { AuthControllerModule } from './controller/auth/auth.module';
import { ProductControllerModule } from './controller/product/product.module';
import { JwtStrategy } from './auth/jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      ignoreEnvFile: false,
      validationSchema: joi.object<IConfigDto>({
        NODE_ENV: joi.string().valid('development', 'production').required(),
        PORT: joi.number().port().required().default(3000),
        JWT_SECRET: joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRES: joi
          .alternatives()
          .try(joi.string(), joi.number().greater(0))
          .required(),
        JWT_REFRESH_TOKEN_EXPIRES: joi
          .alternatives()
          .try(joi.string(), joi.number().greater(0))
          .required(),
        MONGODB_HOST: joi
          .alternatives()
          .try(
            joi.string().hostname().required(),
            joi.string().ip().required(),
          ),
        MONGODB_PORT: joi.number().port().required(),
        MONGODB_DATABASE: joi.string().required(),
        MONGODB_DEBUG: joi.boolean().default(false),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: Connection,
    }),
    AuthControllerModule,
    ProductControllerModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
