import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityNotExistError } from '../errors/entity-not-exist.error';

interface IListOptions<TEntity> {
  where?: FindConditions<TEntity>[] | FindConditions<TEntity> | ObjectLiteral;
  relations?: string[];
  order?: {
    [P in EntityFieldsNames<TEntity>]?: 'ASC' | 'DESC' | 1 | -1;
  };
  pagination?: { skip?: number; take?: number };

  select?: EntityFieldsNames<TEntity>[] | (keyof TEntity)[];
}

export abstract class BaseService<TEntity> {
  protected constructor(
    protected readonly entityClass: string,
    protected readonly repository: Repository<TEntity>,
  ) {}

  async create(createDto: DeepPartial<TEntity>) {
    return this.repository.save(
      this.repository.create(createDto) as DeepPartial<TEntity>,
    );
  }

  async findAll(options: IListOptions<TEntity>) {
    return this.findAndCount(options);
  }

  async findOne(options: IListOptions<TEntity>): Promise<TEntity> {
    return this.repository.findOne(options);
  }

  async findById(id: string): Promise<TEntity> {
    const entityExist = await this.repository.findOne({
      where: { id },
    });

    if (!entityExist) {
      throw new EntityNotExistError(this.entityClass);
    }

    return entityExist;
  }

  async update(
    criteria: FindConditions<TEntity> | { id: string },
    updateDto: QueryDeepPartialEntity<TEntity>,
  ) {
    const entityExist = await this.repository.findOne({
      where: criteria,
    });

    if (!entityExist) {
      throw new EntityNotExistError(this.entityClass);
    }

    await this.repository.update(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      entityExist.id,
      updateDto,
    );

    return updateDto;
  }

  async remove(criteria: FindConditions<TEntity> | { id: string }) {
    const entityExist = await this.repository.findOne({
      where: criteria,
    });

    if (!entityExist) {
      throw new EntityNotExistError(this.entityClass);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.repository.delete(entityExist.id);
  }

  private async findAndCount(options: IListOptions<TEntity>) {
    const { where, pagination, order, relations } = this.getQuery(options);

    const [result, count] = await this.repository.findAndCount({
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
    const defaultQueryLimitNumber =
      parseInt(process.env.DEFAULT_QUERY_LIMIT_NUMBER) ?? 100;

    if (pagination.take >= defaultQueryLimitNumber) {
      pagination.take = defaultQueryLimitNumber;
    }

    return { where, pagination, order, relations };
  }
}
