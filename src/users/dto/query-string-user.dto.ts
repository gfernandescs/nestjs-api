import { BaseQuerystringDto } from '../../base-query-string.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryStringUserDto extends BaseQuerystringDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  email?: string;
}
