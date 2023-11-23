import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginJwt } from './entities/login-jwt.entity';
import { LogInUserInput } from './dto/signIn-user.input';

@Resolver(() => LoginJwt)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginJwt)
  logIn(
    @Args('loginInput') loginInput: LogInUserInput
  ):Promise<LoginJwt> {
    return this.authService.login(loginInput);
  }
}
