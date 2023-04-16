import { Controller } from '@nestjs/common';
import {
  Post,
  Get,
  Param,
  UseGuards,
  Patch,
  Body,
  Delete,
} from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guard';
import { CreateProductDto, EditProductDto } from './dto';
import { ProductService } from './product.service';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductController {
  constructor(private product: ProductService) {}

  @Get()
  getAll() {
    return this.product.readAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const productId = parseInt(id);
    return this.product.read(productId);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.product.create(dto);
  }

  @Patch(':id')
  editProduct(@Param('id') id: string, @Body() dto: EditProductDto) {
    const productId = parseInt(id);
    return this.product.update(productId, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const productId = parseInt(id);
    return this.product.delete(productId);
  }
}
