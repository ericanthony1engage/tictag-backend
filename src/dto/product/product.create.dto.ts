export class CreateProductRequestDto {
  name: string;
  price: number;
  description: string;
}

export class CreateProductResponseDto extends CreateProductRequestDto {
  id: string;
}
