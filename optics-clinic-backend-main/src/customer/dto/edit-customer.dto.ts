import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class EditCustomerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;
}
