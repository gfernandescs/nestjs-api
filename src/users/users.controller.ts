import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/auth.decorator';
import { QueryStringUserDto } from './dto/query-string-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query()
    queryString: QueryStringUserDto,
  ) {
    const { take, skip, ...filter } = queryString;

    return this.usersService.findAll({ where: filter, take, skip });
  }

  @Get(':uuid')
  findById(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.usersService.findById(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.usersService.remove(uuid);
  }
}
