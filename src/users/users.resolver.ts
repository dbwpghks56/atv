import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SignInUserInput } from './dto/signIn-user.input';
import { GraphQLInfo } from 'src/config/decorators/graphQL.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.signUp(createUserInput);
  }

  @Mutation(() => User)
  signIn(@Args('signInUserInput') signInUserInput: SignInUserInput) {
    return this.usersService.signIn(signInUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@GraphQLInfo() requestInfo: string[]) {
    return this.usersService.findAll(requestInfo);
  }
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
