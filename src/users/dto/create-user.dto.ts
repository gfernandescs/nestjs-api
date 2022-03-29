import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { userRoles } from '../constants';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(userRoles)
  @IsNotEmpty()
  roles: userRoles;

  @IsOptional()
  phone?: string;
}
