import { DeepPartial, getRepository, ObjectLiteral } from 'typeorm';

interface IListOptions {
  where?: ObjectLiteral | string | any;
  relations?: string[];
  order?: any;
  pagination?: { skip?: number; take?: number };
}

export abstract class BaseService<TEntity> {
  private entityClass: string;

  protected constructor(entityClass: string) {
    this.entityClass = entityClass;
  }

  async create(createDto: DeepPartial<TEntity>) {
    return getRepository<TEntity>(this.entityClass).save(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getRepository<TEntity>(this.entityClass).create(createDto),
    );
  }

  async findAll(options: IListOptions) {
    return this.findAndCount(options);
  }

  async findOne(options: IListOptions): Promise<TEntity> {
    return getRepository<TEntity>(this.entityClass).findOne(options);
  }

  async findById(id: string): Promise<TEntity> {
    return getRepository<TEntity>(this.entityClass).findOne({
      where: { id },
    });
  }

  async update(id: string, updateDto: DeepPartial<TEntity>) {
    return getRepository<TEntity>(this.entityClass).save({
      id,
      ...updateDto,
    });
  }

  async remove(id: string) {
    return getRepository<TEntity>(this.entityClass).delete(id);
  }

  private async findAndCount(options: IListOptions) {
    const { conditions, pagination, order } = this.getQuery(options);

    const [result, count] = await getRepository<TEntity>(
      this.entityClass,
    ).findAndCount({
      where: conditions,
      relations: options.relations,
      order,
      ...pagination,
    });

    return {
      count,
      data: result,
    };
  }

  private getQuery(options: IListOptions) {
    let { pagination } = options;
    const { order } = options;

    const conditions = options.where;

    if (Array.isArray(conditions)) {
      conditions.map((i) => {
        delete i?.pagination;
        delete i?.sortBy;
        delete i?.orderBy;
      });
    } else {
      delete conditions?.pagination;
      delete conditions?.sortBy;
      delete conditions?.orderBy;
    }

    if (pagination?.take && pagination?.take <= 100) {
      pagination = { ...pagination, take: pagination.take };
    } else {
      pagination = { ...pagination, take: 100 };
    }

    if (pagination?.skip) {
      pagination = {
        ...pagination,
        skip: (pagination.skip - 1) * pagination.take,
      };
    }

    return { conditions, pagination, order };
  }
}
