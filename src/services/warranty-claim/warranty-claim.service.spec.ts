import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyClaimService } from './warranty-claim.service';

describe('WarrantyClaimService', () => {
  let service: WarrantyClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrantyClaimService],
    }).compile();

    service = module.get<WarrantyClaimService>(WarrantyClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
