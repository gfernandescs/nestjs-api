import { DeepPartial } from 'typeorm';
import { BaseQuerystringDto } from '../bases/base-query-string.dto';

export interface IBaseController<
  T,
  createDTO,
  updateDTO extends DeepPartial<T>,
  queryStringDTO extends BaseQuerystringDto,
> {
  create(data: createDTO);
  findAll(queryString: queryStringDTO);
  findById(uuid: string);
  update(uuid: string, data: updateDTO);
  remove(uuid: string);
  getFilters(queryString: queryStringDTO);
}
