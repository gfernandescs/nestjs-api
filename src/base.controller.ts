import { DeepPartial } from 'typeorm';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseQuerystringDto } from './base-query-string.dto';
import { BaseService } from './base.service';

export abstract class BaseController<
  T,
  createDTO extends DeepPartial<T>,
  updateDTO extends DeepPartial<T>,
  queryStringDTO extends DeepPartial<BaseQuerystringDto>,
> {
  protected constructor(protected readonly service: BaseService<T>) {}

  @Post()
  public create(@Body() data: createDTO) {
    return this.service.create(data);
  }

  @Get()
  public findAll(@Query() queryString: queryStringDTO) {
    const filter = this.getFilters(queryString);

    return this.service.findAll(filter);
  }

  @Get(':uuid')
  findById(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.service.findById(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() data: updateDTO,
  ) {
    return this.service.update(uuid, data);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.service.remove(uuid);
  }

  getFilters(queryString: queryStringDTO) {
    const { take, skip, ...filter } = queryString;

    return {
      pagination: {
        take,
        skip,
      },
      where: filter,
    };
  }
}
