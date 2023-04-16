import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLensDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
