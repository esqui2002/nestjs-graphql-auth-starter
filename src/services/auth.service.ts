import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpInput } from 'src/resolvers/auth/dto/signup.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/resolvers/auth/dto/jwt.dto';
import { LoginInput } from 'src/resolvers/auth/dto/login.input';

@Injectable()
export class AuthService { 
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }
  
  async signUp(payload: SignUpInput): Promise<{access_token}> {
    
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);
    const user = await this.userRepository.save(payload);

    return await this.generateToken(user);
  
  }

  async login(payload: LoginInput): Promise<{access_token}> {
    const { email, password } = payload;

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Correo electronico o contraseña incorrectos');
    }

    const passwordResult = await bcrypt.compare(password, user.password);

    if (!passwordResult) {
      throw new UnauthorizedException('Correo electronico o contraseña incorrectos');
    }

    return await this.generateToken(user);
  }

  async generateToken(payload: JwtPayload): Promise<{ access_token }> {
    const { id } = payload;
    const jwt_payload: JwtPayload = { id };

    const access_token = await this.jwtService.sign(jwt_payload);

    return { access_token };
  }
}
