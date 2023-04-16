import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, EditCustomerDto } from './dto';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  getAllCustomers() {
    return this.customerService.allCustomer();
  }

  @Get(':id')
  getcustomerById(@Param('id') id: string) {
    const customerId = parseInt(id);
    return this.customerService.customerById(customerId);
  }

  @Post()
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }

  @Patch(':id')
  editCustomer(@Param('id') id: string, @Body() dto: EditCustomerDto) {
    const customerId = parseInt(id);
    return this.customerService.editCustomer(customerId, dto);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    const customerId = parseInt(id);
    return this.customerService.delete(customerId);
  }
}
