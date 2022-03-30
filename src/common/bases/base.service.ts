import { DeepPartial, getRepository, ObjectLiteral } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { FindConditions } from 'typeorm/find-options/FindConditions';

interface IListOptions<TEntity> {
  where?:
    | FindConditions<TEntity>[]
    | FindConditions<TEntity>
    | ObjectLiteral
    | string
    | any;
  relations?: string[];
  order?: {
    [P in EntityFieldsNames<TEntity>]?: 'ASC' | 'DESC' | 1 | -1;
  };
  pagination?: { skip?: number; take?: number };

  select?: EntityFieldsNames<TEntity>[] | (keyof TEntity)[];
}

export abstract class BaseService<TEntity> {
  protected constructor(protected readonly entityClass: string) {}

  async create(createDto: DeepPartial<TEntity>) {
    return getRepository<TEntity>(this.entityClass).save(
      getRepository<TEntity>(this.entityClass).create(
        createDto,
      ) as DeepPartial<TEntity>,
    );
  }

  async findAll(options: IListOptions<TEntity>) {
    return this.findAndCount(options);
  }

  async findOne(options: IListOptions<TEntity>): Promise<TEntity> {
    return getRepository<TEntity>(this.entityClass).findOne(options);
  }

  async findById(id: string): Promise<TEntity> {
    return getRepository<TEntity>(this.entityClass).findOne({
      where: { id },
    });
  }

  async update(id: string, updateDto: DeepPartial<TEntity>) {
    return getRepository<TEntity>(this.entityClass).save(
      getRepository<TEntity>(this.entityClass).create({
        id,
        ...updateDto,
      }) as DeepPartial<TEntity>,
    );
  }

  async remove(id: string) {
    return getRepository<TEntity>(this.entityClass).delete(id);
  }

  private async findAndCount(options: IListOptions<TEntity>) {
    const { where, pagination, order, relations } = this.getQuery(options);

    const [result, count] = await getRepository<TEntity>(
      this.entityClass,
    ).findAndCount({
      where,
      relations,
      order,
      ...pagination,
    });

    return {
      count,
      data: result,
    };
  }

  private getQuery(options: IListOptions<TEntity>) {
    const { order, relations, where, pagination } = options;

    if (pagination.take >= 100) {
      pagination.take = 100;
    }

    return { where, pagination, order, relations };
  }
}
