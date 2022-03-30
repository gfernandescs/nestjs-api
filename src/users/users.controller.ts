import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/auth.decorator';
import { QueryStringUserDto } from './dto/query-string-user.dto';
import { BaseController } from '../base.controller';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryStringUserDto
> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
