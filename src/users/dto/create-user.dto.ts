import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { userRoles } from '../constants';
import { UniqueUserEmail } from '../users.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @UniqueUserEmail()
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
