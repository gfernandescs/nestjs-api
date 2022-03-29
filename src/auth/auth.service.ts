import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      where: { email: username },
    });

    if (await user?.validatePassword(pass)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id, username: user.name, roles: user.roles };

    return {
      id: user.id,
      name: user.name,
      roles: user.roles,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
