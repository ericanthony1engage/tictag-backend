import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyClaimRepository } from './warranty-claim.repository';

describe('WarrantyClaimService', () => {
  let service: WarrantyClaimRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrantyClaimRepository],
    }).compile();

    service = module.get<WarrantyClaimRepository>(WarrantyClaimRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
