import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/auth.decorator';
import { QueryStringUserDto } from './dto/query-string-user.dto';
import { User } from './entities/user.entity';
import { ControllerFactory } from '../common/factories/controller.factory';

@Controller('users')
export class UsersController extends ControllerFactory<
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryStringUserDto
>(CreateUserDto, UpdateUserDto, QueryStringUserDto) {
  constructor(protected service: UsersService) {
    super();
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }
}
