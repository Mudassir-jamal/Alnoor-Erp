import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLensDto, EditLensDto } from './dto';

@Injectable()
export class LensService {
  constructor(private prisma: PrismaService) {}

  async readAll() {
    const lens = await this.prisma.lens.findMany();

    return lens;
  }

  async read(id: number) {
    const lens = await this.prisma.lens.findUnique({
      where: {
        id,
      },
    });

    return lens;
  }

  async create(dto: CreateLensDto) {
    try {
      const lens = await this.prisma.lens.create({
        data: {
          ...dto,
        },
      });

      return lens;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('lens is already  exist');
      }
      throw error;
    }
  }

  async update(id: number, dto: EditLensDto) {
    const lens = await this.prisma.lens.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return lens;
  }

  async delete(id: number) {
    const lens = await this.prisma.lens.delete({
      where: {
        id,
      },
    });

    return lens;
  }
}
