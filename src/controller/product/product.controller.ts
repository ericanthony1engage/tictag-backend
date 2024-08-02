import { Controller, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Post('/')
  public get() {}
}
