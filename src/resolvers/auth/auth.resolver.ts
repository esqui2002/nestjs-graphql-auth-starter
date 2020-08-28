import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthType } from 'src/types/auth.type';
import { SignUpInput } from './dto/signup.input';
import { AuthService } from 'src/services/auth.service';
import { LoginInput } from './dto/login.input';

@Resolver(of => AuthType)
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) { }
  
  @Mutation(returns => AuthType)
  async signUp(
    @Args('input') signUpInput: SignUpInput
  ) {
    return await this.authService.signUp(signUpInput);
  }

  @Query(returns => AuthType)
  async login(
    @Args('input') loginInput: LoginInput
  ) {
    return await this.authService.login(loginInput);
  }
}
