import { ConfigService } from '@nestjs/config';
import { IConfigDto } from '../../dto/env.dto';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const Connection = (
  configService: ConfigService<IConfigDto>,
): MongooseModuleFactoryOptions | Promise<MongooseModuleFactoryOptions> => ({
  uri: `mongodb://${configService.get('MONGODB_HOST')}:${configService.get('MONGODB_PORT')}/${configService.get('MONGODB_DATABASE')}`,
  user: configService.get('MONGODB_USER'),
  pass: configService.get('MONGODB_PASS'),
});
