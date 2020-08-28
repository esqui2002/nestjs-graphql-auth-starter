import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
require('dotenv').config();

@Module({
  imports: [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: 3600,
    },
  }),
    UserModule
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy
  ],
  exports: [
    JwtStrategy
  ]
})
export class AuthModule {
}
