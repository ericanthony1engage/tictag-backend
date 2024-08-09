import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from '../../schema/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private _model: Model<Product>,
  ) {}

  public checkProductNameExists = (product_name: string): Promise<boolean> =>
    this._model.exists({ name: product_name }).lean();

  public getAllProducts = (
    limit: number,
    page: number,
  ): Promise<ProductDocument[]> =>
    this._model
      .find()
      .select('id name description price')
      .limit(limit)
      .skip(limit * (page - 1))
      .lean();

  public getProductById = (
    id: string | Types.ObjectId,
  ): Promise<ProductDocument> =>
    this._model.findById(id).populate('createdBy', 'username').lean();

  public addProduct = (product: Product): Promise<Product> =>
    this._model.create(product);

  public updateProductById = (
    id: string | Types.ObjectId,
    data: Product,
  ): Promise<ProductDocument> => this._model.findByIdAndUpdate(id, data).lean();

  public removeProductById = (
    id: string | Types.ObjectId,
  ): Promise<ProductDocument> => this._model.findByIdAndDelete(id).lean();
}
