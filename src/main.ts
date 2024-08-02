import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rTracer from 'cls-rtracer';
import helmet from '@fastify/helmet';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { IConfigDto } from './dto/env.dto';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './exception/exceptions-handler.filter';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  app.use(rTracer.fastifyMiddleware());

  const configService: ConfigService<IConfigDto, true> = app.get(
    ConfigService<IConfigDto>,
  );

  app.use(rTracer.fastifyMiddleware());
  app.enableCors({
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: configService.get<IConfigDto['ORIGIN']>('ORIGIN').split('/'),
  });

  app.useGlobalFilters(new GlobalExceptionFilter(configService));
  app.setGlobalPrefix('/api');

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    ),
  );

  await app.listen(configService.get('PORT', 3000), '0.0.0.0');
})();
