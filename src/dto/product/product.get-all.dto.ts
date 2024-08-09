import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    example: '66af73acc110054060d840fa',
    description: "The Product's id",
  })
  id: string;
  @ApiProperty({ example: 'Dior Watch', description: "The product's name" })
  name: string;
  @ApiProperty({
    example: 'All new watch from dior, imported from USA',
    description: "The product's description",
  })
  description: string;
  @ApiProperty({ example: 300000, description: "The product's price" })
  price: number;
  @ApiProperty({ example: 'USD', description: "The product's currency" })
  currency: string;
}
