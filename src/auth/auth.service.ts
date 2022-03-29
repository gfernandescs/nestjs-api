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
    const user = await this.usersService.findOne({ where: { name: username } });

    if (await user?.validatePassword(pass)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };

    return {
      id: user.id,
      name: user.name,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
