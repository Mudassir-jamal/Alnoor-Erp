import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFrameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
