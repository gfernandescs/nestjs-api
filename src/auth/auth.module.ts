import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret.toString(),
      signOptions: jwtConstants.options,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
