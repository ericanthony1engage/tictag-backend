import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../schema/product.schema';
import {
  JsonResponseDto,
  JsonResponseUtil,
} from '../../utils/json-response.util';
import { SwaggerUtil } from '../../utils/swagger.util';
import { CreateProductRequestDto } from '../../dto/product/product.create.dto';
import { JwtStaffGuard } from '../../auth/jwt/jwt-staff.guard';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../../dto/auth/request-with-user.dto';

@UseGuards(AuthGuard('jwt'), JwtStaffGuard)
@Controller('product')
export class ProductController {
  constructor(private _productService: ProductService) {}

  @Get('/')
  @SwaggerUtil({
    summary: 'Get All Product Data',
    successResponse: {
      type: Array<Product>,
    },
  })
  public async get(
    @Query('page') page: number,
  ): Promise<JsonResponseDto<Product[]>> {
    const data: Product[] = await this._productService.getAllProducts(page);

    return new JsonResponseUtil<Product[]>().setData(data).toPlainObject();
  }

  @Post('/')
  @SwaggerUtil({
    summary: 'Add Product',
    bodyType: Product,
    successResponse: {
      type: Product,
    },
  })
  public async add(
    @Request() req: RequestWithUser,
    @Body() data: CreateProductRequestDto,
  ): Promise<JsonResponseDto<Product>> {
    const response: Product = await this._productService.addProduct(
      data,
      req.user,
    );

    return new JsonResponseUtil<Product>().setData(response).toPlainObject();
  }

  @Delete('/:id')
  @SwaggerUtil({
    summary: 'Delete Product',
    successResponse: {
      type: null,
    },
  })
  public async delete(@Param('id') id: string): Promise<JsonResponseDto<null>> {
    await this._productService.removeProductByProductId(id);

    return new JsonResponseUtil<null>().setData(null).toPlainObject();
  }
}
