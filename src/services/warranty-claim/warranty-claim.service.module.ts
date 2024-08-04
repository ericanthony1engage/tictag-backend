import { Module } from '@nestjs/common';
import { WarrantyClaimRepositoryModule } from '../../repository/warranty-claim/warranty-claim.repository.module';
import { WarrantyClaimService } from './warranty-claim.service';

@Module({
  imports: [WarrantyClaimRepositoryModule],
  providers: [WarrantyClaimService],
  exports: [WarrantyClaimService],
})
export class WarrantyClaimServiceModule {}
