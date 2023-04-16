import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditLensDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
