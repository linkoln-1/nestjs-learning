import { IsOptional, IsInt, IsString, Min, Max } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  year?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}
