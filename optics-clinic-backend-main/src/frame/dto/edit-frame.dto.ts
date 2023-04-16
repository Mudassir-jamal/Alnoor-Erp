import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditFrameDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
