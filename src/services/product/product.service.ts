import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repository/product/product.repository';
import { Product, ProductDocument } from '../../schema/product.schema';
import { CreateProductRequestDto } from '../../dto/product/product.create.dto';
import { JwtPayloadDto } from '../../dto/auth/jwt-payload.dto';
import { User } from '../../schema/user.schema';
import { Types } from 'mongoose';
import { ProductResponseDto } from '../../dto/product/product.get-all.dto';

@Injectable()
export class ProductService {
  constructor(private _productRepository: ProductRepository) {}

  public getAllProducts = async (
    page: number,
  ): Promise<ProductResponseDto[]> => {
    const limit: number = 10;
    const result: ProductResponseDto[] = [];
    const data: ProductDocument[] =
      await this._productRepository.getAllProducts(limit, page);

    for (const datum of data) {
      result.push({
        id: datum._id as unknown as string,
        name: datum.name,
        description: datum.description,
        price: datum.price,
        currency: datum.currency,
      });
    }

    return result;
  };

  public getProductbyId = (
    product_id: string | Types.ObjectId,
  ): Promise<Product> => {
    return this._productRepository.getProductById(product_id);
  };

  public addProduct = async (
    product: CreateProductRequestDto,
    user: JwtPayloadDto,
  ): Promise<Product> => {
    if (await this._productRepository.checkProductNameExists(product.name)) {
      throw new BadRequestException(['Product name already exists']);
    }

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
