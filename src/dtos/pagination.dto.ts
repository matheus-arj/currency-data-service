import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => Number(value)) // Converts the string value to a number
  @IsInt()
  @Min(1)
  page: number = 1;

  @Transform(({ value }) => Number(value)) // Converts the string value to a number
  @IsInt()
  @Min(1)
  size: number = 5;
}
