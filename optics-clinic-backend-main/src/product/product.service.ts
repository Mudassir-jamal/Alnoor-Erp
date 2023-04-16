import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async readAll() {
    const product = await this.prisma.product.findMany();

    return product;
  }

  async read(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }

  async create(dto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          ...dto,
        },
      });

      return product;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('product is already  exist');
      }
      throw error;
    }
  }

  async update(id: number, dto: EditProductDto) {
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return product;
  }

  async delete(id: number) {
    const product = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return product;
  }
}
