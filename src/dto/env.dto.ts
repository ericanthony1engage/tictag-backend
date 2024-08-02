export interface IConfigDto {
  NODE_ENV: string;
  PORT: number;
  ORIGIN: string;

  JWT_ACCESS_TOKEN_EXPIRES: string | number;
  JWT_REFRESH_TOKEN_EXPIRES: string | number;
  JWT_SECRET: string;

  MONGODB_HOST: string;
  MONGODB_PORT: number;
  MONGODB_DATABASE: string;
  MONGODB_USER: string;
  MONGODB_PASS: string;
  MONGODB_DEBUG: boolean;
}
