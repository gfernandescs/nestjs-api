import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseQuerystringDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take?: number = 100;

  constructor(skip = 0, take = 100) {
    this.skip = skip;
    this.take = take;
  }
}
