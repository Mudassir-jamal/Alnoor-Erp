import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto, EditCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async allCustomer() {
    const customer = await this.prisma.customer.findMany();

    return customer;
  }

  async customerById(customerId: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    return customer;
  }

  async createCustomer(dto: CreateCustomerDto) {
    try {
      const customer = await this.prisma.customer.create({
        data: {
          ...dto,
        },
      });

      return customer;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Customer is already  exist');
      }
      throw error;
    }
  }

  async editCustomer(customerId: number, dto: EditCustomerDto) {
    const customer = await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        ...dto,
      },
    });

    return customer;
  }

  async delete(customerId: number) {
    const customer = this.prisma.customer.delete({
      where: {
        id: customerId,
      },
    });

    return customer;
  }
}
