import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepositoryModule } from '../../repository/product/product.repository.module';

@Module({
  imports: [ProductRepositoryModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductServiceModule {}
