export class CreateProductRequestDto {
  name: string;
  price: number;
  description: string;
}

export class CreateProductResponseDto extends CreateProductRequestDto {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
