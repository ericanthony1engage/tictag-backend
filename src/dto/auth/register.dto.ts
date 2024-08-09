import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'Username to be inputted',
    example: 'test',
  })
  username: string;
  @ApiProperty({
    description: 'Password to be inputted',
    example: 'test',
  })
  password: string;
}
