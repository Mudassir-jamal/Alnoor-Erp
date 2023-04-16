import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFrameDto, EditFrameDto } from './dto';

@Injectable()
export class FrameService {
  constructor(private prisma: PrismaService) {}

  async readAll() {
    const frame = await this.prisma.frame.findMany();

    return frame;
  }

  async read(id: number) {
    const frame = await this.prisma.frame.findUnique({
      where: {
        id,
      },
    });

    return frame;
  }

  async create(dto: CreateFrameDto) {
    try {
      const frame = await this.prisma.frame.create({
        data: {
          ...dto,
        },
      });

      return frame;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Frame is already  exist');
      }
      throw error;
    }
  }

  async update(id: number, dto: EditFrameDto) {
    const frame = await this.prisma.frame.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return frame;
  }

  async delete(id: number) {
    const frame = await this.prisma.frame.delete({
      where: {
        id,
      },
    });

    return frame;
  }
}
