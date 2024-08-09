import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({
    example: '66ad2dc68882b039201d9f3b',
    description: "User's id",
  })
  _id: string;
  @ApiProperty({
    example: 'test',
    description: "User's username",
  })
  username: string;
}
