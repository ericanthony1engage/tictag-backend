import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'test',
    description: 'The refresh token given from login response',
  })
  refresh_token: string;
}
