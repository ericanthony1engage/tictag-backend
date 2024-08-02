import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../../schema/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private _model: Model<Product>,
  ) {}

  public getAllProducts = (limit: number, page: number): Promise<Product[]> =>
    this._model
      .find()
      .populate('createdBy', 'username')
      .limit(limit)
      .skip(limit * (page - 1))
      .lean();

  public getProductById = (id: string | Types.ObjectId): Promise<Product> =>
    this._model.findById(id).populate('createdBy', 'username').lean();

  public updateProductById = (
    id: string | Types.ObjectId,
    data: Product,
  ): Promise<Product> => this._model.findByIdAndUpdate(id, data).lean();

  public deleteProductById = (id: string | Types.ObjectId): Promise<Product> =>
    this._model.findByIdAndDelete(id).lean();
}
