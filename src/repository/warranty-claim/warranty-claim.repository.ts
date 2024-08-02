import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WarrantyClaim } from '../../schema/warranty-claim.schema';

@Injectable()
export class WarrantyClaimRepository {
  constructor(
    @InjectModel(WarrantyClaim.name)
    private _model: Model<WarrantyClaim>,
  ) {}

  public getAllWarrantyClaims = (
    limit: number,
    page: number,
  ): Promise<WarrantyClaim[]> =>
    this._model
      .find()
      .populate('createdBy', 'username')
      .limit(limit)
      .skip(limit * (page - 1))
      .lean();
}
