import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor() {
    super(User.name);
  }
}
