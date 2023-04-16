import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
}
