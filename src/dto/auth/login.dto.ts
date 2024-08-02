import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 'test', description: 'The username of the user' })
  username: string;

  @ApiProperty({ example: 'test', description: 'The password of the user' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'test',
    description: 'access token used for protected routes',
  })
  access_token: string;
  @ApiProperty({
    example: 'test',
    description: 'refresh token used for generating access token',
  })
  refresh_token: string;
}
