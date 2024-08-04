import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repository/product/product.repository';
import { Product, ProductDocument } from '../../schema/product.schema';
import { CreateProductRequestDto } from '../../dto/product/product.create.dto';
import { JwtPayloadDto } from '../../dto/auth/jwt-payload.dto';
import { User } from '../../schema/user.schema';

@Injectable()
export class ProductService {
  constructor(private _productRepository: ProductRepository) {}

  public getAllProducts = (page: number): Promise<Product[]> => {
    const limit: number = 10;
    return this._productRepository.getAllProducts(limit, page);
  };

  public addProduct = (
    product: CreateProductRequestDto,
    user: JwtPayloadDto,
  ): Promise<Product> => {
    return this._productRepository.addProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      createdBy: user.sub as unknown as User,
    });
  };

  public removeProductByProductId = (
    productId: ProductDocument['id'],
  ): Promise<Product> => {
    return this._productRepository.removeProductById(productId);
  };
}
