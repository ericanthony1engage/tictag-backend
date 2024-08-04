import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WarrantyClaim,
  WarrantyClaimSchema,
} from '../../schema/warranty-claim.schema';
import { WarrantyClaimRepository } from './warranty-claim.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WarrantyClaim.name, schema: WarrantyClaimSchema },
    ]),
  ],
  providers: [WarrantyClaimRepository],
  exports: [WarrantyClaimRepository],
})
export class WarrantyClaimRepositoryModule {}
