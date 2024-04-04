import { IsNotEmpty, IsInt, IsString, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  year: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
